document.querySelector('#connect').addEventListener('click', function(event) {
  navigator.bluetooth.requestDevice({ filters: [{ services: [0xFFE0] }] })
  .then(device => {
    console.log('Device discovered', device.name);
    return device.gatt.connect();
  })
  .then(server => {
    console.log('Getting Battery Service…');
    return server.getPrimaryService(0xFFE0);
  })
  .then(service => {
    console.log('Getting Battery Level Characteristic…');
    return service.getCharacteristic(0xFFE1);
  })
  .then(characteristic => {
    console.log('Reading Battery Level…');
    return characteristic.readValue();
  })
  .then(value => {
    console.log('Battery Level is ' + value.getUint8(0) + '%');
  })
  .catch(error => { console.log(error); });
});