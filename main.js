addEventListener("DOMContentLoaded", (e)=>{
    let from = document.querySelector("#calculadora");
    let inputResultado = document.querySelector("[name='resultado']");
    let numeros = document.querySelector("#numeros");
    let data = {};
    let valor = [];
    numeros.addEventListener("click", (e)=>{
        if(e.target.localName != "div"){
            inputResultado.value += e.target.value;
            valor = inputResultado.value.split(/[*+-]|[//]/);
            data.num1 = valor[0];
            data.num2 = valor[1];
            data.operador = from.dataset.operador;
        }
    })
    from.addEventListener("submit", async(e)=>{
        e.preventDefault();
        if(e.submitter.localName != "input"){
            if(e.submitter.textContent == "C"){
                from.dataset.operador = e.submitter.value;
                inputResultado.value = e.submitter.value;
            }else{
                valor = inputResultado.value.split(/[*+-]|[//]/);
                if(valor.length==2){
                    data.num1 = valor[0];
                    data.num2 = valor[1];
                    data.operador = from.dataset.operador;
                    let config = {
                        method: from.method,
                        body: JSON.stringify(data)
                    };
                    let peticion = await fetch(from.action, config);
                    let json = await peticion.text();
                    document.querySelector("#resultado").innerHTML = json;
                    inputResultado.value = JSON.parse(json).Resultado;
                    inputResultado.value += e.submitter.textContent;
                    from.dataset.operador = e.submitter.value;
                }else{
                    inputResultado.value += e.submitter.textContent;
                    from.dataset.operador = e.submitter.value;
                }
            }
        }else{
            valor = inputResultado.value.split(/[*+-]|[//]/);
            data.num1 = valor[0];
            data.num2 = valor[1];
            data.operador = from.dataset.operador;
            let config = {
                method: from.method,
                body: JSON.stringify(data)
            };
            let peticion = await fetch(from.action, config);
            let json = await peticion.text();
            document.querySelector("#resultado").innerHTML = json;
            inputResultado.value = JSON.parse(json).Resultado;
        }
    })
})