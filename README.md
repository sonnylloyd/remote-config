# SIP Remote Config Generator

## Overview

The **SIP Remote Config Generator** is a web application that allows users to generate configuration files for SIP (Session Initiation Protocol) devices. Users can select different **SIP generators** (such as Linphone) and configure settings such as username, password, domain, transport protocol, and more. The configuration is then stored and made available for download via a QR code or a direct URL.

## Features

- **Generator Selection**: Choose from available SIP generators (e.g., Linphone).
- **Dynamic Form**: After selecting a generator, the relevant fields are dynamically loaded for configuration.
- **Configuration Generation**: Once the form is filled out, the app generates the configuration based on the input.
- **Storage**: The generated configuration is stored temporarily in Redis.
- **Download Options**: After submission, users receive a **QR code** or a **URL** to download the generated configuration file.

## Technologies Used

- **Node.js**: Backend for handling form submissions and generating configurations.
- **Express.js**: Framework for routing and handling HTTP requests.
- **Redis**: Temporary storage for generated configurations.
- **Docker**: Containerization for easy deployment.
- **Awilix**: Dependency Injection for clean and manageable code.
- **Nunjucks**: Templating engine for rendering dynamic web pages.
- **GitHub Actions**: Continuous integration and deployment (CI/CD) to build and push Docker images to Docker Hub.

## Setup and Running Locally

### Prerequisites

- **Node.js** (v16.x or higher)
- **Docker** (for containerization)

### Install Dependencies

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/sip-remote-config.git
   cd sip-remote-config
