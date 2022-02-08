# API


## Tests

Se connecter au raspberry :
```
ssh pi@piensg032
```

Copier API dans raspberry
```
scp -r ./API pi@piensg032:/home/pi
```

Ou mieux cloner le dépot git

Lancer le serveur :
```
DEBUG=api:* npm start
```

Se rendre sur le port :
```
http://172.31.43.155:8080/
```