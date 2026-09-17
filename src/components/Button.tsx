import '../index.css';

interface ButtonProps {
    text: string;
    icon: string;
    NomeClasse: string;
}

function Button({text, NomeClasse, icon}: ButtonProps) {

  return (
    <>
      <button className='text-[var(--color-on-primary)] border-2 border-[var(--color-surface-container-highest)] px-4 py-2 rounded-lg font-medium text-[var(--font-size-label-md)] flex items-center gap-2  hover:bg-[var(--color-primary-container)] hover:text-white transition-colors cursor-pointer'>
        <span className={NomeClasse}>
          {icon}
        </span>

          {text}

      </button>
    </>
  )
};

export default Button;
