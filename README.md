## (api-silo-bolsa) API REST

### Proyecto secado de granos de silo bolsas

Requisitos:
 * [Node.js](https://nodejs.org/es/)
 * [BCM2835](http://www.airspayce.com/mikem/bcm2835/) (Necesario para que funcione los sensores DHT22)

Instalar la libreria bcm2835-1.52:
```
# Dentro del directorio del proyecto:
wget http://www.airspayce.com/mikem/bcm2835/bcm2835-1.52.tar.gz
tar zxvf bcm2835-1.52.tar.gz
cd bcm2835-1.52.tar.gz
./configure
make
make CFLAGS='-g -O2 -fPIC'
sudo make check
sudo make install
```

Instalar api-silo-bolsa:
```
git clone https://github.com/rody7val/api-silo-bolsa
cd api-silo-bolsa
npm install
```

Inicio manual:
```
npm start
```

Inicio con el sistema:
```
# Dentro del directorio del proyecto:
sudo cp api-silo-bolsa.service /lib/systemd/system
sudo systemctl enable api-silo-bolsa.service
sudo systemctl start api-silo-bolsa.service
# Comprobar:
sudo systemctl status api-silo-bolsa
```