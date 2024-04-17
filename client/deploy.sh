#!/bin/bash

# Ejecutar npm run build para generar los archivos de producción
echo "Ejecutando npm run build..."
npm run build

# Verificar si el directorio build existe
if [ -d "/var/www/html/build" ]; then
    # Eliminar el directorio existente
    echo "Eliminando el directorio existente..."
    rm -r /var/www/html/build
fi

# Copiar el nuevo directorio
echo "Copiando el nuevo directorio..."
cp -r build/ /var/www/html/build

# Reiniciar NGINX
echo "Reiniciando NGINX..."
sudo systemctl restart nginx

echo "Tareas completadas."