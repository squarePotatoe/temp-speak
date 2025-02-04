<template>
    <div>
        <div class="bg-white rounded-xl p-4">
            <h1 class=" text-2xl font-medium ">Notes</h1>
            <div class="flex-col flex gap-4">
                <div>
                    <p>Introduction Notes</p>
                    <div class="flex justify-evenly">
                        <input class="w-full border-b-2 p-2" id="intro" type="text" placeholder="Perhaps a 'Hook'">
                        <button class="p-3 mx-2 bg-amber-400 rounded">+</button>
                    </div>
                </div>
                <div>
                 <p>Body Notes</p>
                    <div class="flex justify-evenly">
                        <input class="w-full p-2 border-b-2" id="intro" type="text" placeholder="Make a note">
                        <button class="p-3 mx-2 bg-amber-400 rounded">+</button>
                    </div>
                    <div class="bg-amber-300 p-4 m-2 rounded">
                        <li>History of skysurfing</li>
                        <li>Technical aspects of skysurfing</li>
                        <li>Notable skysurfers and achievements</li>
                        <li>Risks and rewards of skysurfing</li>
                        <li>Idiom: On top of the world</li>
                    </div>
                </div>
                <div>                    
                    <p>Conclusion Notes</p>
                       <div class="flex justify-evenly">
                        <input class="w-full p-2 border-b-2" id="intro" type="text" placeholder="Make a note">
                        <button class="p-3 mx-2 bg-amber-400 rounded">+</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>