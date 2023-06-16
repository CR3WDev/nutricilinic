export function gerarCPF() {
    let cpf = '';
  
    // Gerar 9 dígitos aleatórios
    for (let i = 0; i < 9; i++) {
      cpf += Math.floor(Math.random() * 10);
    }
  
    // Calcular o primeiro dígito verificador
    let sum = 0;
    for (let i = 0; i < 9; i++) {
      sum += parseInt(cpf.charAt(i)) * (10 - i);
    }
    let firstDigit = 11 - (sum % 11);
    if (firstDigit > 9) {
      firstDigit = 0;
    }
    cpf += firstDigit;
  
    // Calcular o segundo dígito verificador
    sum = 0;
    for (let i = 0; i < 10; i++) {
      sum += parseInt(cpf.charAt(i)) * (11 - i);
    }
    let secondDigit = 11 - (sum % 11);
    if (secondDigit > 9) {
      secondDigit = 0;
    }
    cpf += secondDigit;
  
    return cpf;
  }
  