# MongoDB Atlas Configuration

## Sample configuration

Use a database name like `msms` and a connection string in this format:

```text
mongodb+srv://<username>:<password>@<cluster>.mongodb.net/msms?retryWrites=true&w=majority
```

## Required environment variables

```bash
MONGODB_URI=mongodb+srv://username:password@cluster0.mongodb.net/msms?retryWrites=true&w=majority
MONGODB_DB=msms
```

## Recommended Atlas setup

- Create a dedicated database user for the application
- Restrict network access to known IP ranges during development
- Enable backups for production clusters
- Use a strong JWT secret and store it separately from the Atlas password

## Collections

- `users`
- `students`
- `subjects`
- `panels`
- `marks`

## Data behavior

- If MongoDB is reachable, the backend syncs the seeded dataset into Atlas.
- If MongoDB is not reachable, the backend falls back to the local runtime store so development still works.
