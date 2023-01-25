import { useTreeStore } from "@/stores/tree";


export var data = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
  datasets: [
    {
      label: "random noam",
      backgroundColor: '#f87979',
      data: [18, 19, 15, 22, 16, 18, 17]
    }
  ]
}

export const options = {
  responsive: true,
  maintainAspectRatio: false
}


