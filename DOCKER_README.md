# Docker Setup Guide

## Quick Start

### Development Environment

```bash
# Build and run the development container
docker-compose up --build

# The API will be available at http://localhost:3001
```

### Production Environment

```bash
# Build and run the production container
docker-compose -f docker-compose.prod.yml up --build

# The API will be available at http://localhost:3001
```

## Testing the API

Once the container is running, test the three blockchain API endpoints:

### 1. Token Data Endpoint

```bash
curl -s http://localhost:3001/api/contract/tokenData | jq
```

**Expected Output:**

```json
{
  "success": true,
  "data": {
    "name": "USD Coin",
    "symbol": "USDC",
    "contractAddress": "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
    "network": "Ethereum Mainnet",
    "decimals": 6,
    "totalSupply": "46500000000.00",
    "description": "ERC20 stablecoin backed by USD reserves",
    "chainId": 1
  },
  "timestamp": "2026-04-20T00:33:00.000Z",
  "message": "Smart contract data fetched successfully"
}
```

**Console Output:**

```
✅ Successfully fetched contract data
   Contract: USD Coin (USDC)
   Address: 0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48
   Total Supply: 46500000000.00 USDC
```

### 2. Blockchain Statistics Endpoint

```bash
curl -s http://localhost:3001/api/contract/blockchainStats | jq
```

**Expected Output:**

```json
{
  "success": true,
  "data": {
    "network": "Ethereum Mainnet",
    "chainId": 1,
    "totalAddresses": "243000000",
    "totalTransactions": "2100000000",
    "totalContracts": "85000000",
    "avgGasPrice": "35 gwei",
    "topTokens": [
      {
        "symbol": "USDC",
        "name": "USD Coin",
        "holders": "5200000"
      },
      {
        "symbol": "USDT",
        "name": "Tether",
        "holders": "4800000"
      },
      {
        "symbol": "DAI",
        "name": "Dai Stablecoin",
        "holders": "2100000"
      }
    ]
  },
  "timestamp": "2026-04-20T00:33:00.000Z",
  "message": "Blockchain statistics fetched successfully"
}
```

**Console Output:**

```
✅ Successfully fetched blockchain statistics
   Network: Ethereum Mainnet
   Total Addresses: 243000000
   Total Transactions: 2100000000
```

### 3. ETH Price Endpoint

```bash
curl -s http://localhost:3001/api/contract/ethPrice | jq
```

**Expected Output:**

```json
{
  "success": true,
  "data": {
    "asset": "Ethereum",
    "symbol": "ETH",
    "priceUSD": 3456.78,
    "marketCapUSD": 415234000000,
    "network": "Ethereum Mainnet"
  },
  "timestamp": "2026-04-20T00:33:00.000Z",
  "message": "Blockchain asset data fetched successfully"
}
```

**Console Output:**

```
✅ Successfully fetched ETH price from blockchain API
   Current ETH Price: $3456.78
   Market Cap: $415234000000
```

## Docker Commands

### Build the image

```bash
# Development
docker build -t engineering-assessment:dev .

# Production
docker build -f Dockerfile.prod -t engineering-assessment:prod .
```

### Run the container

```bash
# Development with hot reload
docker run -p 3001:3001 -v $(pwd)/src:/app/src engineering-assessment:dev

# Production
docker run -p 3001:3001 -e NODE_ENV=production engineering-assessment:prod
```

### View container logs

```bash
# Using docker-compose
docker-compose logs -f backend

# Using docker directly
docker logs -f engineering-assessment-api
```

### Stop and remove containers

```bash
# Using docker-compose
docker-compose down

# Using docker directly
docker stop engineering-assessment-api
docker rm engineering-assessment-api
```

## Project Structure

```
engineering-assessment/
├── Dockerfile                 # Development container definition
├── Dockerfile.prod            # Production container definition
├── docker-compose.yml         # Development orchestration
├── docker-compose.prod.yml    # Production orchestration
├── .dockerignore              # Docker build exclusions
├── src/
│   ├── index.js              # Express server
│   ├── routes/
│   │   ├── contract.js       # Blockchain API endpoints
│   │   ├── items.js          # Items management endpoints
│   │   └── stats.js          # Statistics endpoints
│   └── config/
│       ├── constant.js       # Network constants
│       ├── db.js             # Database configuration
│       └── dbHandler.js      # Database handler
├── data/
│   └── items.json            # Sample data file
└── package.json              # Dependencies
```

## API Endpoints Summary

| Method | Endpoint                        | Description                                  |
| ------ | ------------------------------- | -------------------------------------------- |
| GET    | `/api/contract/tokenData`       | Fetch USDC token contract data from Ethereum |
| GET    | `/api/contract/blockchainStats` | Fetch blockchain network statistics          |
| GET    | `/api/contract/ethPrice`        | Fetch current ETH price from CoinGecko       |
| GET    | `/api/items`                    | Get all items                                |
| GET    | `/api/items/:id`                | Get item by ID                               |
| POST   | `/api/items`                    | Create new item                              |
| GET    | `/api/stats`                    | Get statistics                               |

## Features

✅ **Smart Contract Interaction** - Fetches data from public smart contracts on Ethereum mainnet  
✅ **Blockchain Integration** - Demonstrates Web3 dApp development patterns  
✅ **Docker Containerization** - Secure, repeatable builds across environments  
✅ **Health Checks** - Automatic monitoring of container health  
✅ **Production Ready** - Multi-stage builds, non-root user, security optimizations  
✅ **Hot Reload** - Development mode with automatic code reloading  
✅ **Comprehensive Logging** - Console output showing successful data fetches

## Security Features

- Non-root user in production (UID 1001)
- Read-only root filesystem
- No privilege escalation
- Minimal attack surface
- Security options enabled
- Proper network isolation

## Requirements

- Docker 20.10+
- Docker Compose 1.29+
- Port 3001 available (configurable)

## Notes

- Development container includes nodemon for hot reloading
- Production container is optimized for minimal size and maximum security
- Both containers include health checks for monitoring
- Network isolation ensures safe inter-service communication
