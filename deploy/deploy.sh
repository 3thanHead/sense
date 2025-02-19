#!/bin/bash

# Set variables
PI_USER="ethan"
PI_HOST="raspberrypi.local"
PI_PATH="/home/ethan/sense"
GO_PATH="backend/apigateway"
PYTHON_PATH="backend/sensors"
WEB_PATH="frontend/senseweb"

# Build Go application
echo "Building Go application..."
cd $GO_PATH
GOOS=linux GOARCH=arm GOARM=7 go build -o main .
cd -

# Build JavaScript application
echo "Building JavaScript application..."
cd $WEB_PATH
npm install
npm run build
cd -

# Deploy to Raspberry Pi
echo "Deploying to Raspberry Pi..."
rsync -avz --delete $GO_PATH/main $PI_USER@$PI_HOST:$PI_PATH/$GO_PATH/
rsync -avz --delete $PYTHON_PATH/src $PI_USER@$PI_HOST:$PI_PATH/$PYTHON_PATH/
rsync -avz --delete $PYTHON_PATH/requirements.txt $PI_USER@$PI_HOST:$PI_PATH/$PYTHON_PATH/
rsync -avz --delete $WEB_PATH/dist $PI_USER@$PI_HOST:$PI_PATH/$WEB_PATH/

# Install Python dependencies on Raspberry Pi
echo "Installing Python dependencies on Raspberry Pi..."
ssh $PI_USER@$PI_HOST << EOF
  cd $PI_PATH/$PYTHON_PATH
  python3 -m venv venv
  source venv/bin/activate
  pip install -r requirements.txt
EOF

# Install systemd service files on Raspberry Pi
echo "Installing systemd service files on Raspberry Pi..."
scp ./systemd/apigatway.service $PI_USER@$PI_HOST:/etc/systemd/system/go_service.service
scp ./systemd/sensors.service $PI_USER@$PI_HOST:/etc/systemd/system/python_service.service

ssh $PI_USER@$PI_HOST << EOF
  sudo systemctl daemon-reload
  sudo systemctl enable apigateway
  sudo systemctl enable sensors
EOF

# Restart services on Raspberry Pi (assuming you have systemd service files set up)
echo "Restarting services on Raspberry Pi..."
ssh $PI_USER@$PI_HOST << EOF
  sudo systemctl restart redis
  sudo systemctl restart apigateway
  sudo systemctl restart sensors
EOF

echo "Deployment complete!"