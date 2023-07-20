fetch('https://jsonplaceholder.typicode.com/todos')
    .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not OK');
        }
        return response.json();
      })
      .then((data) => {
        data.forEach((item)=>{
          tasks.push({task:`${item.title}`});
          ctr++;
        })
        console.log(data);
      })
      .catch(error => {
        console.log('Error:', error.message);
      });