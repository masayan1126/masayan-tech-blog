type Props = {
  searchTerm: string;
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export const SearchBar = ({ searchTerm, handleInputChange }: Props) => {
  return (
    <div>
      <input
        type="text"
        placeholder="検索キーワードを入力してください"
        value={searchTerm}
        onChange={handleInputChange}
        className="px-4 py-2 border border-gray-300 rounded-l-md focus:ring focus:ring-blue-200 focus:outline-none"
      />
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded-r-md hover:bg-blue-600 focus:ring focus:ring-blue-200 focus:outline-none"
      >
        検索
      </button>
    </div>
  );
};
