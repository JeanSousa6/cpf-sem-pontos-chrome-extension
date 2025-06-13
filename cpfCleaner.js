document.addEventListener('DOMContentLoaded', retornoResultado);

function validarCPF(cpfSemPontuacao){
    let cpfSemDigitos = cpfSemPontuacao.slice(0, 9);    

    if(cpfSemPontuacao.length != 11)
        return false; 
    
    function calcDigito(cpfSemDigitos){
        let soma = 0;
        let multiplicador = cpfSemDigitos.length + 1; 

        for(let i = 0; i < cpfSemDigitos.length; i++){
            soma += Number(cpfSemDigitos[i]) * multiplicador;
            multiplicador--;
        }

        const resto  = soma % 11;
       
        if(resto < 2) 
            return 0;
        else
            return 11 - resto; 
    }

    const digito1 = calcDigito(cpfSemDigitos);
    const digito2 = calcDigito(cpfSemDigitos + digito1);  

    return cpfSemPontuacao.endsWith(`${digito1}${digito2}`);
}

function showToast(message) {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.style.visibility = 'visible';
    toast.style.opacity = '1';
    setTimeout(() => {
        toast.style.visibility = 'hidden';
        toast.style.opacity = '0';
    }, 1500);
}


function retornoResultado(){
    const clickButtonCPF = document.getElementById('cleanBtn');
    const clickButtonCopy = document.getElementById('copyBtn');
    const resultado = document.getElementById('result'); 

    clickButtonCPF.addEventListener('click', function() {
        const cpfSemPontuacao = document.getElementById("cpfInput").value.replace(/[.\-]/g, '');
        const valido = validarCPF(cpfSemPontuacao);
        resultado.style.display = "block";
        if (valido) {
            resultado.textContent = cpfSemPontuacao;
            resultado.style.color = "#3628A0";
        } else {
            resultado.textContent = "CPF Inválido";
            resultado.style.color = "red";
        }
    });

    clickButtonCopy.addEventListener('click' , function(){
        const texto = resultado.textContent;
        if(texto && texto !== "CPF Inválido")
            navigator.clipboard.writeText(texto).then(() => showToast("Copiado com Sucesso!!")); 

    })
}





