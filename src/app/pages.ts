import { LucideIcon, FileText, Calculator, ListIcon, TestTube2, Mic, Binary, ClipboardList, StickyNote, Lock } from "lucide-react";

export interface MenuItem {
    id: string;
    title: string;
    subtitle: string;
    description: string;
    icon: LucideIcon;
    iconColor: string;
    iconBg: string;
    buttonColor: string;
    buttonHover: string;
    path: string;
    disabled?: boolean;
    disabledText?: string;
}

export const MenuItems: MenuItem[] = [
    {
        id: "editor",
        title: "Editor",
        subtitle: "Editor de texto avançado",
        description:
            "Editor completo com sistema de arquivos, substituições e templates médicos.",
        icon: FileText,
        iconColor: "text-blue-600",
        iconBg: "bg-blue-100",
        buttonColor: "bg-blue-600",
        buttonHover: "hover:bg-blue-700",
        path: "/editor",
    },
    {
        id: "medication",
        title: "Contador de Doses",
        subtitle: "Calculadora de medicação",
        description:
            "Calcule horários e intervalos de medicação de forma precisa e organizada.",
        icon: Calculator,
        iconColor: "text-purple-600",
        iconBg: "bg-purple-100",
        buttonColor: "bg-purple-600",
        buttonHover: "hover:bg-purple-700",
        path: "/calcula_dose",
    },
    {
        id: "medications",
        title: "Medicações",
        subtitle: "Lista de medicações",
        description:
            "Lista de medicações com informações detalhadas, incluindo substâncias, laboratórios, apresentações e preços.",
        icon: ListIcon,
        iconColor: "text-slate-600",
        iconBg: "bg-slate-100",
        buttonColor: "bg-slate-600",
        buttonHover: "hover:bg-slate-700",
        path: "/medicacoes",
    },
    {
        id: "digita_exames",
        title: "Exames",
        subtitle: "Digitação de exames",
        description:
            "Digite e organize resultados de exames de sangue de forma rápida e eficiente.",
        icon: TestTube2,
        iconColor: "text-red-600",
        iconBg: "bg-red-100",
        buttonColor: "bg-red-600",
        buttonHover: "hover:bg-red-700",
        path: "/digita_exames",
    },
    {
        id: "criptografia",
        title: "Criptografia",
        subtitle: "Criptografia segura",
        description:
            "Criptografe e descriptografe textos de forma segura usando senhas.",
        icon: Lock,
        iconColor: "text-indigo-600",
        iconBg: "bg-indigo-100",
        buttonColor: "bg-indigo-600",
        buttonHover: "hover:bg-indigo-700",
        path: "/criptografia",
    },
    {
        id: "transcricao",
        title: "Transcritor",
        subtitle: "Transcrição de áudio",
        description:
            "Transcreva áudios com precisão e rapidez, facilitando o registro de informações, incluindo exames.",
        icon: Mic,
        iconColor: "text-orange-600",
        iconBg: "bg-orange-100",
        buttonColor: "bg-orange-600",
        buttonHover: "hover:bg-orange-700",
        path: "/transcricao",
    },
    {
        id: "base64",
        title: "Conversor de Base64",
        subtitle: "Conversão de arquivos",
        description:
            "Converta arquivos entre Base64 e formatos padrões, facilitando o armazenamento.",
        icon: Binary,
        iconColor: "text-cyan-600",
        iconBg: "bg-cyan-100",
        buttonColor: "bg-cyan-600",
        buttonHover: "hover:bg-cyan-700",
        path: "/base64",
    },
    {
        id: "exams",
        title: "Exames JSON",
        subtitle: "Organiza exames JSON",
        description:
            "Converta dados de exames em formato JSON estruturado e organizado.",
        icon: ClipboardList,
        iconColor: "text-green-600",
        iconBg: "bg-green-100",
        buttonColor: "bg-green-600",
        buttonHover: "hover:bg-green-700",
        path: "/exames_json",
    },
    {
        id: "notes",
        title: "Notas",
        subtitle: "Sistema de anotações",
        description:
            "Sistema de notas rápidas e organizadas. Funcionalidade em desenvolvimento.",
        icon: StickyNote,
        iconColor: "text-gray-400",
        iconBg: "bg-gray-100",
        buttonColor: "bg-gray-400",
        buttonHover: "",
        path: "/notas",
        disabled: true,
        disabledText: "Em Breve",
    },
];

// Tipo derivado automaticamente dos IDs dos MenuItems
export type MenuItemId = typeof MenuItems[number]['id'];

// Função helper para obter um MenuItem por ID
export function getMenuItemById(id: MenuItemId): MenuItem | undefined {
    return MenuItems.find(item => item.id === id);
}

// Função helper para obter um MenuItem por path
export function getMenuItemByPath(path: string): MenuItem | undefined {
    return MenuItems.find(item => item.path === path);
}
