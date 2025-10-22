"use client";

import React, { useState, useRef, useEffect } from "react";
import { Copy, Check, FileText, Calendar, Trash2 } from "lucide-react";

// ==================== TYPES ====================
interface Exam {
    code: string;
    name: string;
}

interface ExamValues {
    [key: string]: string;
}

// ==================== CONSTANTS ====================
const EXAM_CATEGORIES = {
    Hemograma: [
        { code: "Hem", name: "Hemácias" },
        { code: "Hb", name: "Hemoglobina" },
        { code: "Ht", name: "Hematócrito" },
        { code: "Leuco", name: "Leucócitos" },
        { code: "Neut", name: "Neutrófilos" },
        { code: "Linf", name: "Linfócitos" },
        { code: "Mono", name: "Monócitos" },
        { code: "Eos", name: "Eosinófilos" },
        { code: "Baso", name: "Basófilos" },
        { code: "Plaq", name: "Plaquetas" },
    ],
    "Função Renal": [
        { code: "Ur", name: "Ureia" },
        { code: "Cr", name: "Creatinina" },
    ],
    Glicemia: [
        { code: "HbA1c", name: "Hemoglobina Glicada" },
        { code: "Gli", name: "Glicose" },
        { code: "Ins", name: "Insulina" },
        { code: "HOMA", name: "HOMA-IR" },
    ],
    Lipidograma: [
        { code: "Colesterol Tot", name: "Colesterol Total" },
        { code: "HDL", name: "HDL" },
        { code: "Não HDL", name: "Não HDL" },
        { code: "LDL", name: "LDL" },
        { code: "VLDL", name: "VLDL" },
        { code: "Trig", name: "Triglicérides" },
    ],
    Eletrólitos: [
        { code: "Na", name: "Sódio" },
        { code: "K", name: "Potássio" },
        { code: "Mg", name: "Magnésio" },
        { code: "CaIon", name: "Cálcio Iônico" },
        { code: "CaTotal", name: "Cálcio Total" },
    ],
    "Função Hepática": [
        { code: "TGO", name: "TGO" },
        { code: "TGP", name: "TGP" },
        { code: "GGT", name: "Gama-GT" },
        { code: "FA", name: "Fosfatase Alcalina" },
        { code: "LDH", name: "LDH" },
    ],
    "Bilirrubinas/Proteínas": [
        { code: "BT", name: "Bilirrubina Total" },
        { code: "BD", name: "Bilirrubina Direta" },
        { code: "BI", name: "Bilirrubina Indireta" },
        { code: "PT", name: "Proteína Total" },
        { code: "Alb", name: "Albumina" },
        { code: "Glob", name: "Globulinas" },
    ],
    "Coagulação/Inflamação": [
        { code: "TAP", name: "TAP" },
        { code: "PTT", name: "PTT" },
        { code: "INR", name: "INR" },
        { code: "VHS", name: "VHS" },
        { code: "PCR", name: "PCR" },
    ],
    Outros: [
        { code: "Ac Úrico", name: "Ácido Úrico" },
        { code: "Amilase", name: "Amilase" },
        { code: "Lipase", name: "Lipase" },
    ],
    Vitaminas: [
        { code: "VitD", name: "Vitamina D" },
        { code: "B12", name: "Vitamina B12" },
        { code: "Acido Fólico", name: "Ácido Fólico" },
    ],
    Ferro: [
        { code: "Fe", name: "Ferro Sérico" },
        { code: "IST", name: "Índ. Sat. Transferrina" },
        { code: "Ferritina", name: "Ferritina" },
    ],
    Hepatites: [
        { code: "Anti-HCV", name: "Anti-HCV" },
        { code: "Anti-HBs", name: "Anti-HBs" },
        { code: "HBsAg", name: "HBsAg" },
        { code: "Anti-HBc Total", name: "Anti-HBc Total" },
        { code: "Anti-HBc IgM", name: "Anti-HBc IgM" },
        { code: "Anti-HAV IgG", name: "Anti-HAV IgG" },
    ],
    Marcadores: [
        { code: "CEA", name: "CEA" },
        { code: "CA19-9", name: "CA 19-9" },
        { code: "Alfafeto", name: "Alfa-fetoproteína" },
        { code: "CA125", name: "CA 125" },
    ],
    Tireoide: [
        { code: "TSH", name: "TSH" },
        { code: "T4 Livre", name: "T4 Livre" },
        { code: "T3", name: "T3" },
        { code: "Anti-TPO", name: "Anti-TPO" },
        { code: "Anti-TG", name: "Anti-TG" },
    ],
    PSA: [
        { code: "PSA Total", name: "PSA Total" },
        { code: "PSA Livre", name: "PSA Livre" },
    ],
    "Não Listados": [{ code: "custom", name: "Outros Exames" }],
};

// ==================== COMPONENTS ====================

// Date Field Component
const DateField: React.FC<{
    value: string;
    onChange: (value: string) => void;
}> = ({ value, onChange }) => (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-3 sm:p-4 mb-3 sm:mb-4">
        <div className="flex items-center gap-2 sm:gap-3 mb-2">
            <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />
            <label className="text-sm sm:text-base font-medium text-gray-700">
                Data do Exame:
            </label>
        </div>
        <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="Ex: 21/07/2025, Julho 2025, ontem..."
            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
    </div>
);

// Header Component
const Header: React.FC<{
    onCopy: () => void;
    onClear: () => void;
    copied: boolean;
    hasResults: boolean;
}> = ({ onCopy, onClear, copied, hasResults }) => (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-3 sm:p-4 mb-3 sm:mb-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2 sm:gap-3">
                <FileText className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
                <div>
                    <h1 className="text-lg sm:text-xl font-bold text-gray-800">
                        Exames
                    </h1>
                    <p className="text-xs sm:text-sm text-gray-600">
                        Digite os resultados dos exames médicos
                    </p>
                </div>
            </div>

            <div className="flex items-center gap-2">
                <button
                    onClick={onClear}
                    className="flex items-center gap-2 px-3 sm:px-4 py-2 rounded-lg font-medium transition-all text-xs sm:text-sm bg-red-600 hover:bg-red-700 text-white shadow-md hover:shadow-lg"
                >
                    <Trash2 className="w-3 h-3 sm:w-4 sm:h-4" />
                    Limpar
                </button>
                
                <button
                    onClick={onCopy}
                    disabled={!hasResults}
                    className={`flex items-center gap-2 px-3 sm:px-4 py-2 rounded-lg font-medium transition-all text-xs sm:text-sm ${
                        hasResults
                            ? "bg-blue-600 hover:bg-blue-700 text-white shadow-md hover:shadow-lg"
                            : "bg-gray-300 text-gray-500 cursor-not-allowed"
                    }`}
                >
                    {copied ? (
                        <>
                            <Check className="w-3 h-3 sm:w-4 sm:h-4" />
                            Copiado!
                        </>
                    ) : (
                        <>
                            <Copy className="w-3 h-3 sm:w-4 sm:h-4" />
                            Copiar
                        </>
                    )}
                </button>
            </div>
        </div>
    </div>
);

// Preview Component
const ResultsPreview: React.FC<{ resultsText: string }> = ({ resultsText }) => {
    if (!resultsText) return null;

    return (
        <div className="mt-3 sm:mt-4 bg-white rounded-lg shadow-sm border border-gray-200 p-3 sm:p-4 mb-2">
            <h3 className="font-semibold text-gray-800 mb-2 text-xs sm:text-sm">
                Previsão:
            </h3>
            <div className="bg-gray-50 rounded p-2 sm:p-3 border border-gray-200">
                <code className="text-xs text-gray-700 break-all">
                    {resultsText}
                </code>
            </div>
        </div>
    );
};

// Custom Exams Component
const CustomExamsField: React.FC<{
    value: string;
    onChange: (value: string) => void;
}> = ({ value, onChange }) => (
    <div className="space-y-2">
        <div className="text-xs font-medium text-gray-600 mb-1">
            Digite outros exames:
        </div>
        <textarea
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="Ex: T4 15.2 / TSH 2.1 / Anti-TPO 25"
            className="w-full px-2 py-2 text-xs border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent resize-none"
            rows={3}
        />
        <div className="text-xs text-gray-500">
            Use o formato: Sigla Valor / Sigla Valor
        </div>
    </div>
);

// Exam Input Component
const ExamInput: React.FC<{
    exam: Exam;
    value: string;
    onChange: (value: string) => void;
    inputRef: (el: HTMLInputElement | null) => void;
    onClick: () => void;
}> = ({ exam, value, onChange, inputRef, onClick }) => (
    <div
        onClick={onClick}
        className="flex items-center bg-gray-50 border border-gray-200 rounded px-2 py-1 hover:bg-gray-100 cursor-text transition-colors"
    >
        <div className="font-medium text-gray-800 text-xs w-18 flex-shrink-0">
            {exam.code}
        </div>
        <input
            ref={inputRef}
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="flex-1 ml-1 px-1 py-0.5 text-xs border-0 bg-transparent focus:outline-none focus:ring-0"
            placeholder="--"
        />
    </div>
);

// Exam Category Component
const ExamCategory: React.FC<{
    categoryName: string;
    exams: Exam[];
    examValues: ExamValues;
    customExams: string;
    onExamChange: (examCode: string, value: string) => void;
    onCustomExamsChange: (value: string) => void;
    inputRefs: React.MutableRefObject<{
        [key: string]: HTMLInputElement | null;
    }>;
    onCellClick: (examCode: string) => void;
}> = ({
    categoryName,
    exams,
    examValues,
    customExams,
    onExamChange,
    onCustomExamsChange,
    inputRefs,
    onCellClick,
}) => (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden mb-2 sm:mb-3 break-inside-avoid">
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-2 py-1.5">
            <h3 className="font-semibold text-xs text-center truncate">
                {categoryName}
            </h3>
        </div>

        <div className="p-2">
            <div className="space-y-1.5">
                {exams.map((exam) => (
                    <div key={exam.code}>
                        {exam.code === "custom" ? (
                            <CustomExamsField
                                value={customExams}
                                onChange={onCustomExamsChange}
                            />
                        ) : (
                            <ExamInput
                                exam={exam}
                                value={examValues[exam.code] || ""}
                                onChange={(value) =>
                                    onExamChange(exam.code, value)
                                }
                                inputRef={(el) => {
                                    inputRefs.current[exam.code] = el;
                                }}
                                onClick={() => onCellClick(exam.code)}
                            />
                        )}
                    </div>
                ))}
            </div>
        </div>
    </div>
);

// ==================== CUSTOM HOOKS ====================
const useExamResults = () => {
    const [examValues, setExamValues] = useState<ExamValues>({});
    const [customExams, setCustomExams] = useState("");
    const [examDate, setExamDate] = useState("");
    const [copied, setCopied] = useState(false);

    // Initialize exam values
    useEffect(() => {
        const initialValues: ExamValues = {};
        Object.values(EXAM_CATEGORIES)
            .flat()
            .forEach((exam) => {
                initialValues[exam.code] = "";
            });
        setExamValues(initialValues);
    }, []);

    // Generate exam text
    const generateExamText = (): string => {
        const results: string[] = [];

        Object.values(EXAM_CATEGORIES)
            .flat()
            .forEach((exam) => {
                if (exam.code === "custom") return;
                const value = examValues[exam.code];
                if (value && value.trim()) {
                    results.push(`${exam.code} ${value.trim()}`);
                }
            });

        if (customExams && customExams.trim()) {
            results.push(customExams.trim());
        }

        const examText = results.join(" / ");

        if (examText) {
            const dateText = examDate && examDate.trim() ? examDate.trim() : "";
            return `Lab ${dateText}: ${examText}`;
        }

        return "";
    };

    // Handle copy
    const handleCopy = async () => {
        const text = generateExamText();
        if (text) {
            try {
                await navigator.clipboard.writeText(text);
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
            } catch (err) {
                console.error("Erro ao copiar:", err);
            }
        }
    };

    // Handle clear
    const handleClear = () => {
        const clearedValues: ExamValues = {};
        Object.values(EXAM_CATEGORIES)
            .flat()
            .forEach((exam) => {
                clearedValues[exam.code] = "";
            });
        setExamValues(clearedValues);
        setCustomExams("");
        setExamDate("");
    };

    return {
        examValues,
        setExamValues,
        customExams,
        setCustomExams,
        examDate,
        setExamDate,
        copied,
        generateExamText,
        handleCopy,
        handleClear,
    };
};

// ==================== MAIN COMPONENT ====================
export default function ExamWriter() {
    const {
        examValues,
        setExamValues,
        customExams,
        setCustomExams,
        examDate,
        setExamDate,
        copied,
        generateExamText,
        handleCopy,
        handleClear,
    } = useExamResults();

    const inputRefs = useRef<{ [key: string]: HTMLInputElement | null }>({});

    // Handlers
    const handleInputChange = (examCode: string, value: string) => {
        setExamValues((prev) => ({
            ...prev,
            [examCode]: value,
        }));
    };

    const handleCellClick = (examCode: string) => {
        const input = inputRefs.current[examCode];
        if (input) {
            input.focus();
        }
    };

    const resultsText = generateExamText();

    return (
        <div className="min-h-screen bg-gray-50 p-2 sm:p-4">
            <div className="max-w-full mx-auto">
                <Header
                    onCopy={handleCopy}
                    onClear={handleClear}
                    copied={copied}
                    hasResults={!!resultsText}
                />

                <div className="flex justify-center p-3">
                    <div className="max-w-7xl w-full">
                        <ResultsPreview resultsText={resultsText} />
                        <DateField value={examDate} onChange={setExamDate} />
                    </div>
                </div>

                {/* Grid de Exames */}
                <div className="flex justify-center">
                    <div className="max-w-7xl w-full">
                        <div className="columns-3 sm:columns-4 md:columns-4 lg:columns-4 xl:columns-4 gap-2 sm:gap-3">
                            {Object.entries(EXAM_CATEGORIES).map(
                                ([categoryName, exams]) => (
                                    <ExamCategory
                                        key={categoryName}
                                        categoryName={categoryName}
                                        exams={exams}
                                        examValues={examValues}
                                        customExams={customExams}
                                        onExamChange={handleInputChange}
                                        onCustomExamsChange={setCustomExams}
                                        inputRefs={inputRefs}
                                        onCellClick={handleCellClick}
                                    />
                                )
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
