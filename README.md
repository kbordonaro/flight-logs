# Flight Log

## Installation

```
> npm install
```
After the dependencies are installed, you can run Fight Log in two modes; development or production.

### Development
```
> npm run dev
```

### Production
```
> npm start
```
---

## Data Generation
Flight Log provides the ability to import records into the system via a CSV file. 

There are three datasets provided
- `data/small.csv` - This dataset allows you to debug using with a small amount of data in the applicaiton.
- `data/dataset.csv` - Is a large dataset that will allow you to see all Flight Log at a larger scale (100 entries).
- `data/invalid.csv` - This dataset has an invalid entry in the CSV so that you can test the validation feature of Flight Log.

To generate your own data set you can execute `generateCVS.js`.  Example:
```
> cd data
> node generateCSV.js large 1000
```
This example will generate the file, `data/large.csv` with 1000 records.

---

## Uploading Records
Flight Log provides the ability to upload log records into the system via a CSV file.  The CSV file **MUST** have a header row `drone,generation,startDate,endDate,latitude,longitude,imagePath` and all subsequent rows **MUST** contain the correct data types for each entry.

In Flight Log, click the *Upload Records* Menu Item in the application banner.  Using the File Chooser, select your CSV file.

After the import has completed, you should see a message indicating a successful upload.  However if your CSV file has invalid entries, you will see an error message.  To confirm that the CSV file format is incorrect, an error code of **400** should be displayed in the message.

***Note: Importing records only adds records to the database.  It does not clear out the existing records.  Importing the same CSV file twice will cause duplicate records.***

---

## Finding Records
Flight Log allows you to find records in the system.  Click the *Find Records* Menu Item in the application banner to get a list of available queries.

- *Drone Generation* allows you to query all the records for a given drone generation.  Select a generation from the list of available generations and click *Find Generation* button.
- *Flight Dates* allows you to query all the records within a date range.  Select a start and end date and click the *Find Records* button.  Flight Log will do an inclusive search; finding all the records from the beginning ot the start date and the end of the end date.
- *Flight Duration* allows you to query all the records that are under a given amount of time.  Enter the maximum number of minutes of the fight and click *Find Flight Duration*.
- *Flight Location* allows you to query all flights that occured within a given geographic area.  Enter the top and bottom latitudes along with the right and left longitudes (in degrees).  Then, click *Find Flight Area*.

Once your query is complete, you should see a list of flights that match the parameters (or *No Results Found!* if no records matched the query).  The list should display a summary of each record.  Clicking on the arrow key will expand the record to display all of its information.