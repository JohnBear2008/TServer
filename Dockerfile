FROM johnbear2008/tserver
WORKDIR /tserver
EXPOSE 3000
EXPOSE 8000
CMD ["pm2-runtime", "app.js"]