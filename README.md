# Azure App Service Frontend Demo

This repository contains a small static frontend and an Azure Pipelines configuration that packages the site and deploys it to Azure App Service.

## Project Structure

```text
.
|-- azure-pipelines.yml
|-- index.html
|-- src/
|   |-- main.js
|   `-- styles.css
`-- web.config
```

`web.config` enables static hosting and client-side route fallback for a Windows Azure App Service.

## Prerequisites

- An Azure subscription.
- An Azure DevOps project.
- A Windows Azure App Service.
- An Azure Resource Manager service connection in Azure DevOps with permission to deploy to the App Service.

## Create the Azure App Service

You can create the App Service from the Azure portal or Azure CLI. The pipeline in this repository is configured for a Windows Web App because it deploys static files and a `web.config`.

Example Azure CLI commands:

```bash
az group create --name rg-frontend-demo --location eastus
az appservice plan create --name plan-frontend-demo --resource-group rg-frontend-demo --sku B1
az webapp create --name YOUR-APP-SERVICE-NAME --resource-group rg-frontend-demo --plan plan-frontend-demo
```

Replace `YOUR-APP-SERVICE-NAME` with a globally unique App Service name.

## Configure Azure DevOps

1. Push this repository to Azure Repos or GitHub.
2. In Azure DevOps, open **Project settings > Service connections**.
3. Create an **Azure Resource Manager** service connection.
4. Grant the service connection access to the resource group or subscription that contains the App Service.
5. Open `azure-pipelines.yml` and replace:
   - `YOUR-AZURE-SERVICE-CONNECTION` with the service connection name.
   - `YOUR-APP-SERVICE-NAME` with the Azure App Service name.
6. Create a new pipeline in Azure DevOps and select the existing `azure-pipelines.yml` file.
7. Run the pipeline.

## What the Pipeline Does

The pipeline has two stages:

1. **Build** copies `index.html`, `src/**`, and `web.config` into a staging folder, then creates `frontend.zip`.
2. **Deploy** downloads the artifact and deploys the zip package to Azure App Service with the `AzureWebApp@1` task.

After the deploy stage succeeds, open:

```text
https://YOUR-APP-SERVICE-NAME.azurewebsites.net
```

## Local Preview

Because this is a static frontend, you can open `index.html` directly in a browser for a quick preview.
