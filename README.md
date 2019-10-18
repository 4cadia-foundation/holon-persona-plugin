## Abstract

Holon is a project to manage your identity in a decentralized way. The protocol was create to save user's data in blockchain and give the power to the user to control they own data. This is a open source project, so this extension is a example of protocol aplication.

The base of this extension are smart contracts, created to save and manage the user's data and relationship between users, validators and consumers. 

## System requeriments 

It is necessary install node and npm to download and run this extension.

- Run the command below for the installation of the node
```sh
  $ sudo apt-get update
  $ sudo apt-get install nodejs
```
- Run the command below for the installation of the npm
```sh
  $ sudo apt-get install npm 
```

## How to install

To install in developer mode, follow the step-by-step:

- Download the repository on your computer. Then access the directory where you downloaded this project and run the command below.

```sh
  $ npm install
```
- Run the command below for generate package "dist" on your project
```sh
  $ npm run compile
```

To install the extension project in your Google Chrome:

- Access the browser and navigate to extensions - Options >> More tools >> Extensions
- Enable "Developer Mode"
- Click in "Load Unpacked"
- Access the package dist builded previously in the project - holon-persona-plugin >> dist

The Chrome browser will create your plugin in developer mode and make the icon available in the browser

## Tech

To build this application was used:

  - React - 16.8.6
  - Bootstrap - 3.3.7
  - Babel - 7.4.5
