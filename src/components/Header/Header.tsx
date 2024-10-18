
import { version } from '../../settings/Version';

export const Header = () => {
  return (
    <header className="flex justify-between items-center py-4 px-1 bg-gray-100">
      <h1 className="text-3xl font-bold text-left ml-0">SYNERGY FONT TOOL</h1>
      <p className="text-sm text-gray-600">{`v${version}`}</p>
    </header>
  );
};