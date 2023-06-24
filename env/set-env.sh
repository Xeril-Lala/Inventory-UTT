#!/bin/bash

# Replace placeholders in appsettings.json with environment variable values
sed -i "s/\${API_KEY}/${API_KEY}/g" ./appsettings.json
sed -i "s/\${DB_CONNECTION}/${DB_CONNECTION}/g" ./appsettings.json