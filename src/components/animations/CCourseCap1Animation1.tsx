import React, { useState } from 'react';
import { InteractiveAnimationContainer } from './InteractiveAnimationContainer';
import { motion } from 'motion/react';
import { HardDrive } from 'lucide-react';

export const CCourseCap1Animation1: React.FC = () => {
  const [selectedType, setSelectedType] = useState<'char' | 'short' | 'int' | 'float'>('int');
  const [inputValue, setInputValue] = useState<number>(1024);

  const typeSpecs = {
    char: { bytes: 1, bits: 8, hexBase: '0x7ffd00', desc: 'Almacena 1 carácter o entero pequeño (-128 a 127)' },
    short: { bytes: 2, bits: 16, hexBase: '0x7ffd00', desc: 'Entero de 16 bits (-32,768 a 32,767)' },
    int: { bytes: 4, bits: 32, hexBase: '0x7ffd00', desc: 'Entero estándar ANSI C de 32 bits en arquitectura x86_64' },
    float: { bytes: 4, bits: 32, hexBase: '0x7ffd00', desc: 'Número de coma flotante IEEE 754 de precisión simple' }
  };

  const currentSpec = typeSpecs[selectedType];

  // Convert inputValue to binary bits array of length currentSpec.bits
  const getBits = () => {
    let val = Math.floor(Math.abs(inputValue));
    let binary = val.toString(2);
    if (binary.length < currentSpec.bits) {
      binary = '0'.repeat(currentSpec.bits - binary.length) + binary;
    } else {
      binary = binary.slice(-currentSpec.bits);
    }
    return binary.split('');
  };

  const bits = getBits();

  const stepExplanations = [
    `Paso 1: Declaración de 'int x = ${inputValue};' en lenguaje C. El compilador reserva ${currentSpec.bytes} bytes continuos en la pila RAM.`,
    `Paso 2: Conversión a Binario. El valor ${inputValue} se traduce a una secuencia de ${currentSpec.bits} bits en base 2.`,
    `Paso 3: Representación Hexadecimal en RAM (${currentSpec.hexBase}04 a ${currentSpec.hexBase}07).`,
    `Paso 4: Lectura por la CPU. La ALU extrae los ${currentSpec.bytes} bytes mediante una sola instrucción de lectura de 32 bits.`
  ];

  const codeSnippet = `// Asignación de Tipos Primitivos en C
#include <stdio.h>

int main() {
    ${selectedType} variable = ${inputValue};
    
    printf("Valor: %d\\n", variable);
    printf("Tamaño en RAM: %lu bytes\\n", sizeof(variable));
    printf("Dirección Memoria: %p\\n", (void*)&variable);
    return 0;
}`;

  return (
    <InteractiveAnimationContainer
      title="Animación 2.1: Mapa Interactivo de Reserva de Memoria RAM para Tipos Primitivos"
      conceptTag="Lenguaje C - Tipos & Memoria"
      description="Visualiza la representación física exacta en bytes y bits de las variables en la memoria RAM."
      totalSteps={4}
      stepExplanations={stepExplanations}
      codeSnippet={codeSnippet}
      extraControls={
        <div className="flex items-center gap-2">
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value as any)}
            className="bg-[#FFF7ED] border border-[#FDBA74] text-[#C2410C] font-mono font-bold text-xs px-2 py-1 rounded-lg outline-hidden"
          >
            <option value="char">char (1 byte)</option>
            <option value="short">short (2 bytes)</option>
            <option value="int">int (4 bytes)</option>
            <option value="float">float (4 bytes)</option>
          </select>
          <input
            type="number"
            value={inputValue}
            onChange={(e) => setInputValue(parseInt(e.target.value, 10) || 0)}
            className="w-20 bg-white border border-[#E5E2DE] text-[#1A1A1A] font-mono text-xs px-2 py-1 rounded-lg outline-hidden"
          />
        </div>
      }
    >
      {({ step }) => (
        <div className="space-y-6">
          {/* Metadata Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="p-3 bg-[#F9F8F6] border border-[#E5E2DE] rounded-xl font-mono text-xs space-y-1">
              <span className="text-[#8C8882] text-[10px] block uppercase">Tipo de Dato C</span>
              <span className="text-[#C2410C] font-bold text-sm block">{selectedType}</span>
              <span className="text-[10px] text-gray-500">{currentSpec.desc}</span>
            </div>

            <div className="p-3 bg-[#F9F8F6] border border-[#E5E2DE] rounded-xl font-mono text-xs space-y-1">
              <span className="text-[#8C8882] text-[10px] block uppercase">Bytes en RAM (`sizeof`)</span>
              <span className="text-[#1A1A1A] font-bold text-sm block">{currentSpec.bytes} Bytes ({currentSpec.bits} Bits)</span>
              <span className="text-[10px] text-gray-500">Dirección Base: {currentSpec.hexBase}04</span>
            </div>

            <div className="p-3 bg-[#FFF7ED] border border-[#FDBA74] rounded-xl font-mono text-xs space-y-1">
              <span className="text-[#C2410C] text-[10px] block uppercase font-bold">Valor Almacenado</span>
              <span className="text-[#C2410C] font-bold text-sm block">{inputValue}</span>
              <span className="text-[10px] text-[#C2410C]/80">Formato Decimal Estándar</span>
            </div>
          </div>

          {/* Interactive RAM Memory Cells Representation */}
          <div className="p-5 bg-[#0D0E11] border border-[#2A2D35] rounded-2xl space-y-4 text-white font-mono">
            <div className="flex items-center justify-between text-xs text-gray-400 pb-2 border-b border-[#2A2D35]">
              <span className="flex items-center gap-1.5">
                <HardDrive className="w-4 h-4 text-[#C2410C]" />
                Registros de Memoria RAM (Hexadecimal &amp; Bits)
              </span>
              <span className="text-[10px] bg-[#252833] px-2 py-0.5 rounded text-amber-300">
                Arquitectura Litte-Endian
              </span>
            </div>

            {/* Bytes Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
              {Array.from({ length: currentSpec.bytes }).map((_, byteIdx) => {
                const byteBits = bits.slice(byteIdx * 8, (byteIdx + 1) * 8);
                const hexAddr = `${currentSpec.hexBase}0${4 + byteIdx}`;

                return (
                  <motion.div
                    key={byteIdx}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: byteIdx * 0.1 }}
                    className={`p-3 rounded-xl border ${
                      step >= 1
                        ? 'bg-[#181A22] border-[#C2410C] text-amber-200'
                        : 'bg-[#121316] border-[#2A2D35] text-gray-400'
                    }`}
                  >
                    <div className="flex justify-between items-center text-[10px] text-gray-400 mb-2 font-bold">
                      <span>Byte {byteIdx + 1}</span>
                      <span className="text-[#FDBA74]">{hexAddr}</span>
                    </div>

                    {/* Bit Boxes */}
                    <div className="grid grid-cols-8 gap-1">
                      {byteBits.map((bit, bitIdx) => (
                        <div
                          key={bitIdx}
                          className={`h-7 rounded flex items-center justify-center font-mono font-bold text-xs ${
                            bit === '1'
                              ? 'bg-[#C2410C] text-white shadow-xs'
                              : 'bg-[#252833] text-gray-500'
                          }`}
                        >
                          {bit}
                        </div>
                      ))}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </InteractiveAnimationContainer>
  );
};
