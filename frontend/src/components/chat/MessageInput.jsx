import { useState, useRef, useEffect } from "react";
import { Send, Image, X, Loader2 } from "lucide-react";
import { useChatStore } from "../../store/useChatStore";
import toast from "react-hot-toast";

function MessageInput({ onSendMessage, isSending }) {
  const { isSoundEnabled } = useChatStore();
  const [text, setText] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null);
  const textInputRef = useRef(null);

  const handleKeyDown = (e) => {
    if (!isSoundEnabled) return;
    if (['Shift', 'Control', 'Alt', 'Meta', 'CapsLock', 'Tab', 'Enter', 'Backspace', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'Escape'].includes(e.key)) return;
    
    const keystrokes = [
      '/sounds/keystroke1.mp3',
      '/sounds/keystroke2.mp3',
      '/sounds/keystroke3.mp3',
      '/sounds/keystroke4.mp3',
    ];
    const randomKeystroke = keystrokes[Math.floor(Math.random() * keystrokes.length)];
    const audio = new Audio(randomKeystroke);
    audio.volume = 0.5;
    audio.play().catch(err => console.log("Audio play failed:", err));
  };

  useEffect(() => {
    textInputRef.current?.focus();
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (!file.type.startsWith("image/")){
      toast.error("Please select an image file");
    }
    

    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const removeImage = () => {
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim() && !imagePreview) return;
    onSendMessage({ text: text.trim(), image: imagePreview });
    setText("");
    removeImage();
  };

  return (
    <div className="p-3 border-t border-white/5">
      {/* Image Preview */}
      {imagePreview && (
        <div className="relative inline-block mb-3">
          <img
            src={imagePreview}
            alt="Preview"
            className="object-cover w-20 h-20 border rounded-xl border-slate-700/50"
          />
          <button
            onClick={removeImage}
            className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center hover:bg-red-400 transition-colors"
          >
            <X className="w-3 h-3 text-white" />
          </button>
        </div>
      )}

      {/* Input Row */}
      <form onSubmit={handleSubmit} className="flex items-center gap-2">
        {/* Image Upload */}
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="flex items-center justify-center w-9 h-9 flex-shrink-0 transition-all rounded-lg text-slate-400 hover:text-orange-400 hover:bg-slate-800/50 border border-transparent hover:border-slate-700/30"
        >
          <Image className="w-4 h-4" />
        </button>
        <input
          type="file"
          accept="image/*"
          className="hidden"
          ref={fileInputRef}
          onChange={handleImageChange}
        />

        {/* Text Input */}
        <input
          ref={textInputRef}
          type="text"
          placeholder="Type a message..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-1 py-2.5 px-4 text-sm text-white bg-slate-950/50 border border-slate-700/30 rounded-xl focus:border-orange-500/40 focus:ring-1 focus:ring-orange-500/30 focus:outline-none placeholder:text-slate-600 transition-all"
        />

        {/* Send Button */}
        <button
          type="submit"
          disabled={(!text.trim() && !imagePreview) || isSending}
          className="flex items-center justify-center w-9 h-9 flex-shrink-0 transition-all rounded-xl bg-orange-600 hover:bg-orange-500 text-white disabled:opacity-30 disabled:cursor-not-allowed active:scale-95 shadow-[0_0_12px_-3px_rgba(249,115,22,0.3)]"
        >
          {isSending ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Send className="w-4 h-4" />
          )}
        </button>
      </form>
    </div>
  );
}

export default MessageInput;
