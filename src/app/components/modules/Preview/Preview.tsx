function Preview() {
  return (
    <div className="flex flex-col h-full">
      <h2 className="text-3xl font-bold">Design</h2>
      <div className="designs--frame rounded flex-1">
        <canvas
          id="designs--frame-canvas"
          className="w-full h-full border-double border-4 border-indigo-600"
        >
          <canvas id="designs--frame-canvas--original" />
        </canvas>
        <span
          id="design-dimensions"
          className="prose font-light text-sm text-gray-400"
        ></span>
      </div>
    </div>
  )
}

export default Preview
