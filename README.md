## Monitoring Vital Signs Application

This repository contains the source code and documentation for a Monitoring Vital Signs application built using React,
Next.js, and React Native.

|                                                                                                                                         |                                                                                                                                                                                                                                                                                                           |                                                                                                                |                                                                                                                   |
|-----------------------------------------------------------------------------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|----------------------------------------------------------------------------------------------------------------|-------------------------------------------------------------------------------------------------------------------|
| <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/2300px-React-icon.svg.png" width="100" height="100"> | <img src="https://camo.githubusercontent.com/9a45407f0a2a0c52f76b9458728049eca3ddb60ecec92a43f8cd2af93d253940/68747470733a2f2f7061676570726f2e636f2f626c6f672f77702d636f6e74656e742f75706c6f6164732f323032302f30332f72656163742d6e61746976652d6c6f676f2d333234783337352e706e67" width="100" height="125"> | <img src="https://static-00.iconduck.com/assets.00/nestjs-icon-512x510-9nvpcyc3.png" width="100" height="100"> | <img src="https://cdn.iconscout.com/icon/free/png-256/free-mongodb-3629020-3030245.png" width="100" height="100"> |


### Overview

The Monitoring Vital Signs application is designed to track and monitor various vital signs, such as heart rate, blood
pressure, and body temperature.
It provides a user-friendly interface for users to authorize, and allow users to share their monitored vital signs, so
dedicated observer could observe signs, and notify users, about their physical condition.

This system was developed as an educational project specifically designed for use during firefighting operations.

### Features

1. User Registration and Authentication
    - Users can create account and log in using their credentials
    - Admins can create account using default credentials and secret code.
    - Observers can be created only with admin accounts.
    - System contains jwt authorization, and role based access
2. Real time data monitoring
    - Data is transmitted through WebSockets connection.
    - System uses encrypted Websockets room keys.
    - Observers get data only in their work region, and choosed brigade.
3. Threshold monitoring
    - Users can set personalized thresholds for each vital sign.

### Installation

To work with this project, first clone repository.

```
git clone https://github.com/Katarhu/monitoring-system
```

After cloning the repository, next step is to set up node modules and start each peace of system:

***

### Server:

```
cd monitoring-server
npm i
npm run start
```

It is necessary to add .env file to root folder of **monitoring-server** directory.

```text
PORT=8080
DB_USER=*Your MongoDB Database password*
DB_PASSWORD=*Your MongoBD Database password*
DB_NAME=*Your MongoDB Database name*

JWT_AUTH_KEY=*Key that jsonwebtoken uses to encrypt user data*
ADMIN_KEY=*Encrypted by bcryptjs key for Admin to create new account*
KEY=*Plain text admin key in case you forgot it ^_^*
```
***

### Mobile client:

```
cd monitoring-app
npm i
expo start 
```
##### Opening program

After executing the necessary commands, the next step is to open the application on your mobile Expo program. To do this, follow the steps below:

1. Make sure you have Expo Client installed on your mobile device. You can download it from the App Store (iOS) or Google Play Store (Android).

2. Ensure that your mobile device is connected to the same network as your development machine.

3. Launch the Expo Client app on your mobile device.

4. Once the Expo Client is open, you should see a QR code scanner screen.

5. On your development machine, navigate to the terminal or command prompt where you ran the previous commands.

6. Look for the output in the terminal or command prompt that provides a QR code or a URL.

7. Using the QR code scanner screen on the Expo Client app, scan the QR code displayed in the terminal or enter the provided URL.

8. The Expo Client app will start to load the Monitoring Vital Signs application.

9. After loading, you should be able to interact with the application on your mobile device.

##### Getting started:

To get started as a user, please follow these steps:

1. Create a new account on the registration page.
2. Personalize the threshold for each vital sign according to your preferences.
3. Begin monitoring on the main page.

Please note that the monitoring data is simulated for demonstration purposes to showcase the system's capabilities.

***

### Web client:

```
cd monitoring-web
npm i
npm run dev
```

After executing commands, the next step is to open [http://localhost:5173](http://localhost:5173)

Authorization screens has:
 - Admin login and registration pages
 - Observer login page


After successfully creating a new admin account, you can create observers on the Admin page and modify existing observers. 
To proceed as an observer, you need to log in to the system using the credentials created by the admin.

To start monitoring vital signs, follow these steps:

1. On the Observers page, select the available brigade in your region.
2. After selecting the brigade, you will gain access to observe vital signs in real time.

By following these steps, you will be able to create and manage observers as an admin and then log in as an observer to monitor vital signs in real time.

