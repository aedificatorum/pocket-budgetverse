## Prerequisites
Requires `src/serviceAccount.json` to be present, download from:

https://console.firebase.google.com/project/<PROJECT-NAME>/settings/serviceaccounts/adminsdk

## Running

`npm start` downloads the accounts and transactions, and stores them in a jsonlines file, in a timestamped folder:
- output
  - YYYY-MM-ddTHH-mm-ss
    - accounts.jsonl
    - transactions.jsonl

The `backup.ps1` file invokes `npm start` and creates a zip archive of the timestamped folder in the `zips` folder.  If the file `copyBackupTo.txt` is present, this zip archive is then copied to the folder specified in that text file, e.g.:

```
~/backups/firestore
```