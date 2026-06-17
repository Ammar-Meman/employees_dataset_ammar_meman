import mongoose from "mongoose";
import fs from "fs";
import "dotenv/config";
import dns from "node:dns";
dns.setServers(["8.8.8.8", "8.8.4.4"]);
import connectDB from "./src/config/db.js";
import Employee from "./src/models/Employee.js";

const importData = async () => {
  try {
    await connectDB();

    console.log("Reading JSON file...");
    const data = fs.readFileSync("../Employees_Dataset.json", "utf-8");
    const parsedData = JSON.parse(data);
    const employees = parsedData.employees;

    console.log(`Successfully parsed ${employees.length} employees from JSON.`);
    
    console.log("Clearing existing data...");
    await Employee.deleteMany();

    console.log("Inserting new data...");
    await Employee.insertMany(employees);

    console.log("Data successfully imported!");
    process.exit();
  } catch (error) {
    console.error("Error with data import:", error);
    process.exit(1);
  }
};

importData();
