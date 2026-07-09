"use client";

export function VoiceWaveform() {
  return (
    <div className="flex items-center justify-center gap-1 py-3">
      {[1, 2, 3, 4, 5].map((i) => (
        <div
          key={i}
          className="waveform-bar w-1 rounded-full bg-blue-600"
          style={{ height: `${12 + i * 4}px` }}
        />
      ))}
      <span className="ml-3 text-sm text-gray-500">Listening...</span>
    </div>
  );
}
