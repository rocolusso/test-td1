
export class Controller {

    constructor(view, model){
        this.view = view
        this.model = model
    }

    start(){

        const form = document.getElementById(this.model.formId);
        form.addEventListener('submit',this.submitHandler);
        window.addEventListener('click',this.removeHandler);
        window.addEventListener('DOMContentLoaded', this.loaderHandler);


    }


    getFormData = inputs =>{
        let data = inputs;

        if(inputs instanceof NodeList){
           data = Array.from(inputs)
        }

        return data.reduce((acc, item) => {

         try{
            acc[item.name] = item.value;
            return acc;

         }catch(Error){

            console.log('Error');
         }

        },{})
    }

    submitHandler = e =>{

        e.preventDefault();
        e.stopPropagation();

        const form = document.getElementById(this.model.formId);
        const inputs = form.querySelectorAll('input, textarea');

        const data = this.getFormData(inputs);
        form.reset();

        if(!data)console.log('Error');

        this.model.setData(data);

        const savedData = this.model.data;

        const itemData = savedData[savedData.length-1];

        this.view.renderToDoItem(itemData);


    }

    removeHandler = (e) =>{
        // e.preventDefault();
        e.stopPropagation();

        if(e.target.classList.contains('btn-delete')){

           const itemDel= e.target.closest('.itemContainer');
           const itemId = +itemDel.getAttribute('data-id');

           this.view.removeToDoItem(itemDel);
           this.model.removeItem(itemId);





            // const itemId = +e.target.getAttribute('data-id');
            //
            // let data = this.model.data;
            //
            // data = data.filter(item => item.id !== itemId)
            // console.log(data);
            //
            // localStorage.setItem(this.model.formId, JSON.stringify(data))
            //
            // document.getElementById('todoItems').innerHTML='' ;
            //
            // this.model.data.forEach(item => {
            //     this.view.renderToDoItem(item);
            // })


            // this.view.removeToDoItem(e.target);
        }


    }


    loaderHandler = () =>{

       let data = this.model.data;

        if(data){
            data = data[Symbol.iterator]();
            for(let key of data){
                this.view.renderToDoItem(key)
            }

            // data.forEach(item => {
            //     this.view.renderToDoItem(item);
            // })
        }

    }
}

