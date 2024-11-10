document.addEventListener('DOMContentLoaded', function() {
    const rutInput = document.getElementById('rut');
    const userForm = document.getElementById('userForm');
    const resultDiv = document.getElementById('result');
    const usernameSpan = document.getElementById('username');
    const passwordSpan = document.getElementById('password');

    // Formatea el rut
    rutInput.addEventListener('input', function(e) {
        let value = e.target.value;
        
        // elimina digitos no validos
        value = value.replace(/[^0-9kK]/g, '');
        
        if (value.length > 0) {
            // Numero de verificación
            let verificationDigit = value.slice(-1);
            let numbers = value.slice(0, -1);
            
            // Le da Formato al Rut
            if (numbers.length > 3) {
                numbers = numbers.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
            }
            
            // le agrega el digito verificador
            value = numbers + '-' + verificationDigit;
        }
        
        e.target.value = value;
    });


    userForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = document.getElementById('name').value;
        const rut = rutInput.value;
        
        // Toma el primer nombre
        const firstName = name.split(' ')[0];
        
        // extrae los datos para el nombre de usuario
        const rutNumbers = rut.replace(/[^0-9kK]/g, ''); // elimina digitos no validos
        const lastThreeBeforeHyphen = rutNumbers.slice(-5, -2); // toma los ultimos 3 numeros del rut
        const verificationDigit = rutNumbers.slice(-1); // digito verificador
        
        // Crea nombre de usuario
        const username = `${firstName}-${lastThreeBeforeHyphen}-${verificationDigit}`.toUpperCase();
        
        // crea la contraseña
        const password = rutNumbers.slice(0, -1);
        
        // resultados
        usernameSpan.textContent = username;
        passwordSpan.textContent = password;
        resultDiv.style.display = 'block';
    });
});

        