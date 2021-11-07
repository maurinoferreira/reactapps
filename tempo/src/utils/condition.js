export function condition(condition){
  switch(condition){
        case 'storm':
          return icon = {
            name: 'thunderstorm-outline',
            color: '#1ec9ff'
          };
          break;

          case 'snow':
          return icon = {
            name: 'snow-outline',
            color: '#1ec9ff'
          };
          break;

        case 'hail':
          return icon = {
            name: 'weather-hail',
            color: '#1ec9ff'
          };
          break;
         
         case 'rain' :
          return icon = {
            name: 'rainy-outline',
            color: '#1ec9ff'
          }; 
          break;

          case 'fog':
          return icon = {
            name: 'weather-fog',
            color: '#1ec9ff'
          };
          break;

          case 'clear_day':
          return icon = {
            name: 'sunny-outline',
            color: '#ffb300'
          };
          break;

         default:
          return icon = {
            name: 'cloud-outline',
            color: '#1ec9ff'
          }; 
          break;
  }

}