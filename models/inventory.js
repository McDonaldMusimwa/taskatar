const { Int32 } = require("mongodb");
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const PurchaseSchema = new Schema({
  purchaseId: String,
  productId: String,
  cost: Number,
  count: Number,
  total: Number,
  receivedDate: Date,
  timestamp: { type: Date, default: Date.now },
});

const ProductSchema = new Schema({
  
  productId: String,
  title: String,
  description: String,
  totalCount: Number, // Total count of all receipts
  totalCost: Number, // Total cost of all receipts
  history: [
    {
      receiptId: String,
      receivedDate: Date,
      count: Number,
      cost: Number,
    },
  ],
});

/*
In this example, when placing an order, you provide the productId and the desired count of units to be deducted from the stock.
The code retrieves the corresponding Product document, checks if there are enough units in stock, 
and then iterates over the history array using the FIFO method to deduct the units.

The FIFO deduction process starts with the earliest receipts and deducts the entire
 receipt count if it's smaller than or equal to the remaining units to be deducted. 
 If a receipt count is larger than the remaining units, only a partial deduction is made,
  and the count and cost are adjusted accordingly.

After deducting the units from the stock, the updated product document is saved,
 and a success response is sent back.

Note that this is a simplified example, 
and you may need to adapt it to your specific requirements and application structure.
 Additionally, consider handling edge cases, 
 such as when there are insufficient units in stock or when the desired count exceeds the total count available.
*/

// Assuming you have an API route or controller for placing an order
router.post("/order", async (req, res) => {
  const { productId, count } = req.body;

  try {
    // Find the product by productId
    const product = await Product.findOne({ productId });

    if (!product) {
      return res.status(404).send("Product not found");
    }

    // Check if there are enough units in stock
    if (product.totalCount < count) {
      return res.status(400).send("Insufficient stock");
    }

    // Deduct units from the stock using FIFO
    let remainingCount = count;

    for (const receipt of product.history) {
      if (receipt.count <= remainingCount) {
        // Deduct entire receipt
        remainingCount -= receipt.count;
        product.totalCount -= receipt.count;
        product.totalCost -= receipt.cost;
        receipt.count = 0;
        receipt.cost = 0;
      } else {
        // Deduct partial receipt
        receipt.count -= remainingCount;
        product.totalCount -= remainingCount;
        product.totalCost -= (remainingCount / receipt.count) * receipt.cost;
        remainingCount = 0;
      }

      if (remainingCount === 0) {
        break;
      }
    }

    // Save the updated product
    await product.save();

    res.status(200).send("Order placed successfully");
  } catch (err) {
    console.error(err);
    res.status(500).send("Failed to place the order");
  }
});

/*
At the end of each business day, before closing, 
calculate the stock levels for each product and store the information in the end-of-day stock collection.

Make sure to mark this collection as read-only or implement appropriate access controls to prevent accidental modifications.

When you need to retrieve historical stock levels for a specific month or date range,
query the end-of-day stock collection based on the desired time range and product.

By maintaining a separate collection for end-of-day stock levels,
you can easily query and retrieve historical data without impacting the real-time stock management functionality.
This approach provides a reliable and auditable record of stock levels over time.

Create a script or function that retrieves the current stock levels at the end of the business day. 
This can be done by querying the product schema and calculating the remaining stock based on the FIFO method.

Use a scheduling library or built-in functionality to schedule the execution of the script at midnight. 
For example, you can use node-cron or node-schedule in Node.js to schedule the task to run at midnight every day.

In the scheduled script, retrieve the current stock levels using the method mentioned in step 1 and save the data to the end-of-day stock collection. 
You can create a new document in the end-of-day collection with a timestamp or date to identify the specific day.

Ensure that the script handles any errors or exceptions that may occur during the process and has appropriate error logging or notifications in place.

By setting up this automated process, you eliminate the need for employees to manually store the end-of-day stock levels. 
The script will run automatically at midnight and capture the current stock levels for that day, saving it to the end-of-day collection for future reference and historical reporting.

  */
const EndOfDayStock = new Schema({
  date: { type: Date, required: true },
  productId: String,
  stockLevel: Number,
});
