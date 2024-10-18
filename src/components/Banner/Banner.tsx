import { BannerProps } from './BannerProps';

export const Banner = ({ title }: BannerProps) => {
  return (
    <div className="border-teal-700 border-solid rounded bg-gradient-to-r from-slate-900 to-slate-700 w-full py-2">
      <p className="px-2 text-white text-left font-sans">{title}</p>
    </div>
  );
};