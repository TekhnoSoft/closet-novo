import { toast } from 'react-toastify';
class Utils {
    static mobileCheck() {
        let check = false;
        (function (a) { if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) check = true; })(navigator.userAgent || navigator.vendor || window.opera);
        return check;
    }
    static responsiveCarousel() {
        return {
            superLargeDesktop: {
                breakpoint: { max: 4000, min: 3000 },
                items: 1
            },
            desktop: {
                breakpoint: { max: 3000, min: 1024 },
                items: 1
            },
            tablet: {
                breakpoint: { max: 1024, min: 464 },
                items: 1
            },
            mobile: {
                breakpoint: { max: 464, min: 0 },
                items: 1
            }
        }
    }
    static formatBRL(number) {
        return number.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    }
    static toast({ text, type }) {
        switch (type) {
            case "success":
                toast.success(text);
                break;
            case "error":
                toast.error(text);
                break;
            case "info":
                toast.info(text);
                break;
        }
    }
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
    static validateFormDataRegister({ step, formData }) {
        switch (step) {
            case 1:
                if (formData.nome.trim().length < 3) {
                    Utils.toast({ type: "error", text: "Nome completo deve ter pelo menos 3 caracteres" });
                    return false;
                }

                if (!Utils.validatePhone(formData.celular)) {
                    Utils.toast({ type: "error", text: "Celular deve conter 11 dígitos (DDD + número)" });
                    return false;
                }

                if (!Utils.validateCPF(formData.cpf)) {
                    Utils.toast({ type: "error", text: "CPF inválido" });
                    return false;
                }

                if (!Utils.validateEmail(formData.email)) {
                    Utils.toast({ type: "error", text: "Email inválido" });
                    return false;
                }

                if (formData.senha.length < 6) {
                    Utils.toast({ type: "error", text: "Senha deve ter pelo menos 6 caracteres" });
                    return false;
                }

                if (formData.senha !== formData.confirmarSenha) {
                    Utils.toast({ type: "error", text: "As senhas não coincidem" });
                    return false;
                }
                return true;
            case 2:
                if (!Utils.validateCEP(formData.cep)) {
                    Utils.toast({ type: "error", text: "CEP inválido" });
                    return false;
                }

                if (formData.logradouro.trim().length < 3) {
                    Utils.toast({ type: "error", text: "Logradouro deve ter pelo menos 3 caracteres" });
                    return false;
                }

                if (!formData.numero || isNaN(formData.numero)) {
                    Utils.toast({ type: "error", text: "Número do endereço deve ser válido" });
                    return false;
                }

                if (formData.bairro.trim().length < 3) {
                    Utils.toast({ type: "error", text: "Bairro deve ter pelo menos 3 caracteres" });
                    return false;
                }

                if (formData.cidade.trim().length < 3) {
                    Utils.toast({ type: "error", text: "Cidade deve ter pelo menos 3 caracteres" });
                    return false;
                }

                if (formData.estado.trim().length !== 2) {
                    Utils.toast({ type: "error", text: "Estado deve conter 2 caracteres" });
                    return false;
                }
                return true;
        }
    }
    static getClientToken () {
        return localStorage.getItem("closetnovo_cliente_token");
    }
    static formatCPF(cpf) {
        cpf = cpf.replace(/\D/g, ""); // Remove qualquer caractere que não seja número
        if (cpf.length !== 11) return cpf; // Verifica se tem 11 dígitos
        return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
    }
    static formatCelular(celular) {
        celular = celular.replace(/\D/g, ""); // Remove qualquer caractere que não seja número
        if (celular.length === 11) {
            return celular.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");
        } else if (celular.length === 10) {
            return celular.replace(/(\d{2})(\d{4})(\d{4})/, "($1) $2-$3");
        }
        return celular;
    }
    static validateFormDataProduct ({data}) {
        
    }
}

export default Utils;