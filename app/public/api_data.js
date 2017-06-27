define({ "api": [
  {
    "type": "get",
    "url": "/sensors",
    "title": "Obtener Sensores",
    "group": "Sensor",
    "version": "0.1.0",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "status",
            "description": "<p>Código de estado HTTP.</p>"
          },
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "users",
            "description": "<p>Arreglo de todos los sensores.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Respuesta de ejemplo con dos sensores en la Base de Datos:",
          "content": "{\n    status: 200,\n    sensors: [{\n       _id: \"5941a7b29c046c155c50fed0\",\n       temp: [18.6, 17.31],\n       prefix: [\"E01\", \"E02\"],\n       time: 543239,\n       vcc: 65535,\n       placa: \"A\",\n       sector: \"eje-1\",\n       pin: 2,\n       unix: 1497474994181.0,\n       created: \"2017-06-14T21:16:34.181Z\"\n    },{\n       _id: \"5941a7b29c046c155c50fed1\",\n       temp: [18.43, 17.4],\n       prefix: [\"E01\", \"E02\"],\n       time: 593239,\n       vcc: 65435,\n       placa: \"A\",\n       sector: \"eje-1\",\n       pin: 2,\n       unix: 1497474998356.0,\n       created: \"2017-06-14T23:34:15.181Z\"\n    }]\n}",
          "type": "json"
        }
      ]
    },
    "filename": "controllers/sensor_controller.js",
    "groupTitle": "Sensor",
    "name": "GetSensors"
  },
  {
    "type": "post",
    "url": "/sensors",
    "title": "Crear Sensor",
    "group": "Sensor",
    "version": "0.1.0",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Float[]",
            "optional": false,
            "field": "temp",
            "description": "<p>Temperaturas registradas.</p>"
          },
          {
            "group": "Parameter",
            "type": "String[]",
            "optional": false,
            "field": "prefix",
            "description": "<p>Prefijo del identificador crc8 de los sensores DS18B20.</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "time",
            "description": "<p>Tiempo en milisegundos del registro de la temperatura desde la placa ESP8266.</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "vcc",
            "description": "<p>Voltje en voltios del registro de la temperatura desde la placa ESP8266.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "placa",
            "description": "<p>Nombre de la placa ESP8266.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "sector",
            "description": "<p>Nombre del sector.</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "pin",
            "description": "<p>Numero del pin al cual estan conectados los sensores.</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "unix",
            "description": "<p>Tiempo en formato unix del momento en que se guarda el registro en la base de datos.</p>"
          },
          {
            "group": "Parameter",
            "type": "Date",
            "optional": false,
            "field": "created",
            "description": "<p>Tiempo en formato date del momento en que se guarda el registro en la base de datos.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "status",
            "description": "<p>Código de estado HTTP.</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "sensor",
            "description": "<p>Objeto Sensor.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Respuesta de ejemplo de exito al crear un sensor.",
          "content": "{\n    status: 200,\n    sensor: {\n       _id: \"5941a7b29c046c155c50fed0\",\n       temp: [18.6, 17.3],\n       prefix: [\"E01\", \"E02\"],\n       time: 543239,\n       vcc: 65535,\n       placa: \"A\",\n       sector: \"eje-1\",\n       pin: 2,\n       unix: 1497474994181.0,\n       created: \"2017-06-14T21:16:34.181Z\"\n    }\n}",
          "type": "json"
        }
      ]
    },
    "filename": "controllers/sensor_controller.js",
    "groupTitle": "Sensor",
    "name": "PostSensors"
  },
  {
    "type": "get",
    "url": "/users",
    "title": "Obtener Usuarios",
    "group": "Users",
    "version": "0.1.0",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "status",
            "description": "<p>Código de estado HTTP.</p>"
          },
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "users",
            "description": "<p>Arreglo de todos los usuarios.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Respuesta de ejemplo con dos usuarios en la Base de Datos:",
          "content": "{\n    status: 200,\n    users: [{\n        _id:\"5876c58152788f0a046d3a50\",\n        email:\"rodolfo@gmail.com\"\n    },{\n        _id:\"5876c58152788f0a046d3c69\",\n        email:\"nicolas@gmail.com\"\n    }]\n}",
          "type": "json"
        }
      ]
    },
    "filename": "controllers/user_controller.js",
    "groupTitle": "Users",
    "name": "GetUsers"
  },
  {
    "type": "post",
    "url": "/auth/login",
    "title": "Iniciar Sesión",
    "group": "Users",
    "version": "0.1.0",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>Email del usuario registrado.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>Contraseña del usuario registrado.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "status",
            "description": "<p>Código de estado HTTP.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>Firma cifrada que permite identificar un usuario.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Respuesta de ejemplo de exito al iniciar sesión.",
          "content": "{\n    status: 200,\n    token: \"eyJ0eXAiOiJKV1GUzI1NXAiOiJXAiOiJiJ9.eyJzdWIXAiOiJiOiGMTUyNzg4ZXAiOiJjBhMDQ...\",\n    user: {\n         name: \"User Name\",\n         email: \"user@email.com\",\n         password: \"zI1NXAiOiJXAiOiJiJ9\",\n    }\n}",
          "type": "json"
        }
      ]
    },
    "filename": "controllers/auth_controller.js",
    "groupTitle": "Users",
    "name": "PostAuthLogin"
  },
  {
    "type": "post",
    "url": "/auth/signup",
    "title": "Crear Usuario",
    "group": "Users",
    "version": "0.1.0",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>Email del usuario a registrar.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>Contraseña elegida por el usuario.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "status",
            "description": "<p>Código de estado HTTP.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>Firma cifrada que permite identificar un usuario.</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "user",
            "description": "<p>Objeto Usuario.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Respuesta de ejemplo de exito al crear un usuario.",
          "content": "{\n    status: 200,\n    token: \"eyJ0eXAiOiJKV1GUzI1NXAiOiJXAiOiJiJ9.eyJzdWIXAiOiJiOiGMTUyNzg4ZXAiOiJjBhMDQ...\",\n    user: {\n         name: \"User Name\",\n         email: \"user@email.com\",\n         password: \"zI1NXAiOiJXAiOiJiJ9\",\n    }\n}",
          "type": "json"
        }
      ]
    },
    "filename": "controllers/auth_controller.js",
    "groupTitle": "Users",
    "name": "PostAuthSignup"
  }
] });
