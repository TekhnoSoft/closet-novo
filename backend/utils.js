class Utils {
    static validateCPF(cpf) {
        cpf = cpf.replace(/[^\d]/g, ''); // Remove todos os caracteres não numéricos
        if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) return false;

        let sum = 0;
        let remainder;
        for (let i = 1; i <= 9; i++) sum += parseInt(cpf.substring(i - 1, i)) * (11 - i);
        remainder = (sum * 10) % 11;

        if (remainder === 10 || remainder === 11) remainder = 0;
        if (remainder !== parseInt(cpf.substring(9, 10))) return false;

        sum = 0;
        for (let i = 1; i <= 10; i++) sum += parseInt(cpf.substring(i - 1, i)) * (12 - i);
        remainder = (sum * 10) % 11;

        return remainder === parseInt(cpf.substring(10, 11));
    }
    static validatePhone(phone) {
        phone = phone.replace(/[^\d]/g, ''); // Remove todos os caracteres não numéricos
        return phone.length === 11 && /^[1-9]{2}9\d{8}$/.test(phone); // Formato: DDD + 9 + 8 dígitos
    }
    static validateCEP(cep) {
        if (typeof cep !== 'string') return false; // Verifica se o CEP é uma string
        cep = cep.replace(/[^\d]/g, ''); // Remove todos os caracteres não numéricos
        return cep.length === 8 && /^[0-9]{5}-?[0-9]{3}$/.test(cep); // Formato: 00000-000 ou 00000000
    }
    static validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    static validatePassword(password) {
        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
        return passwordRegex.test(password);
    }
    static validateFormDataRegister(formData ) {
        if (formData.nome.trim().length < 3) {
            return { success: false, text: "Nome completo deve ter pelo menos 3 caracteres" };
        }
    
        if (!Utils.validatePhone(formData.celular)) {
            return { success: false, text: "Celular deve conter 11 dígitos (DDD + número)" };
        }
    
        if (!Utils.validateCPF(formData.cpf)) {
            return { success: false, text: "CPF inválido" };
        }
    
        if (!Utils.validateEmail(formData.email)) {
            return { success: false, text: "Email inválido" };
        }
    
        if (formData.senha.length < 6) {
            return { success: false, text: "Senha deve ter pelo menos 6 caracteres" };
        }
    
        if (formData.senha !== formData.confirmarSenha) {
            return { success: false, text: "As senhas não coincidem" };
        }
    
        if (!Utils.validateCEP(formData.cep)) {
            return { success: false, text: "CEP inválido" };
        }
    
        if (formData.logradouro.trim().length < 3) {
            return { success: false, text: "Logradouro deve ter pelo menos 3 caracteres" };
        }
    
        if (!formData.numero || isNaN(formData.numero)) {
            return { success: false, text: "Número do endereço deve ser válido" };
        }
    
        if (formData.bairro.trim().length < 3) {
            return { success: false, text: "Bairro deve ter pelo menos 3 caracteres" };
        }
    
        if (formData.cidade.trim().length < 3) {
            return { success: false, text: "Cidade deve ter pelo menos 3 caracteres" };
        }
    
        if (formData.estado.trim().length !== 2) {
            return { success: false, text: "Estado deve conter 2 caracteres" };
        }
    
        return { success: true, text: '' };
    }
    static removeAllMaskCharacters (str) {
        return str.replaceAll("(", "").replaceAll(")", "").replaceAll("-", "").replaceAll(".", "").replaceAll(" ", "");
    }
}

module.exports = Utils;