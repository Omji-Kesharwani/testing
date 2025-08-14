# Project-1

A Node.js/Express application with Prisma ORM for PostgreSQL.

## Setup Instructions

### 1. Install Dependencies
```bash
npm install
```

### 2. Environment Variables
Create a `.env` file in the `project-1` directory with the following content:

```env
# Database connection string
DATABASE_URL="postgresql://username:password@localhost:5432/database_name"

# Server configuration (optional)
PORT=3000
```

**Important:** Replace the DATABASE_URL with your actual PostgreSQL connection string.

### 3. Database Setup
```bash
# Generate Prisma client
npx prisma generate

# Push schema to database
npx prisma db push

# View database in Prisma Studio
npx prisma studio
```

### 4. Run the Application

**Development mode:**
```bash
npm run dev
```

**Production mode:**
```bash
npm run build
npm start
```

## Troubleshooting

### Database Connection Issues
- Ensure your `.env` file is in the `project-1` directory (same level as `package.json`)
- Verify your DATABASE_URL is correct
- Check if PostgreSQL is running
- Ensure the database exists

### Common Errors
- **"Cannot find module"**: Run `npm install` and `npx prisma generate`
- **"Database connection failed"**: Check your DATABASE_URL in `.env`
- **"Port already in use"**: Change PORT in `.env` or kill the process using the port

## Project Structure
```
project-1/
├── src/
│   ├── index.ts      # Express app and routes
│   ├── db.ts         # Prisma client configuration
│   └── bin.ts        # Server entry point
├── prisma/
│   └── schema.prisma # Database schema
├── generated/         # Generated Prisma client
├── .env              # Environment variables
└── package.json      # Dependencies and scripts
```

## API Endpoints

- `POST /sum` - Calculate sum of two numbers and store in database
  - Body: `{ "a": number, "b": number }`
  - Response: `{ "answer": number, "id": number }`
