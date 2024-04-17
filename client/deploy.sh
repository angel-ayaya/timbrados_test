#!/bin/bash

# Eliminar el directorio existente
echo "Eliminando el directorio existente..."
rm -r /var/www/html/build

# Copiar el nuevo directorio
echo "Copiando el nuevo directorio..."
cp -r build/ /var/www/html/build

# Reiniciar NGINX
echo "Reiniciando NGINX..."
sudo systemctl restart nginx

echo "Tareas completadas."