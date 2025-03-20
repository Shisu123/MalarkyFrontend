{/*  
  This is the component that is displayed when no chat is
  selected. This is  all UI stuff.
*/}
const NoChatSelected = () => {
  return (
      <div className="flex-1 flex items-center justify-center">
          <div className="text-center px-4 -space-y-20">
              <img 
                  src="/public/MalarkyLogo.png" 
                  alt="Malarky Logo" 
                  className="h-[400px] w-auto object-contain mx-auto"
              />
              <p className="text-xl text-gray-600">Select a chat to start messaging</p>
          </div>
      </div>
  );
};

export default NoChatSelected;