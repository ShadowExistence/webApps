export interface Sensor{
  id: string,
  show: boolean,
  name: string,
  type: string,
    last_value: {
      value: number,
      time: string
    }
  values: [{
    time: String,
    value: number
  }]
}