# Collaborative suite API

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
DATABASE_URL="file:projects.db"
```

## Installation

1. Clone the repository
2. Install dependencies:

```bash
npm install
```

3. Generate Prisma client:

```bash
npm run prisma:generate
```

## Running the API

Development mode:

```bash
npm run start:dev
```

## Running Tests

```bash
npm run test:unit
```

Have fun !
