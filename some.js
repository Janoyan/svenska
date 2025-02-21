const fs = require('fs');
const { execSync } = require('child_process');

const text = `Eleven läser en bok.
The student is reading a book.
Läraren skriver på tavlan.
The teacher is writing on the board.
Ursäkta, kan du hjälpa mig?
Excuse me, can you help me?
Ursäkta, var ligger toaletten?
Excuse me, where is the restroom?
Ursäkta, jag är sen.
Excuse me, I am late.
Jag har en fråga
I have a question
Vad betyder det?
What does that mean?
Hur säger man something på svenska?
How do you say ... in Swedish?
Vad heter ... på svenska?
What is ... called in Swedish?
Hur uttalar man ... ?
How do you pronounce ... ?
Hur skriver man ... ?
How do you write ... ?
Kan du säga det en gång till?
Could you repeat that?
Jag förstår inte.
I don’t understand.
Jaha! Nu förstår jag!
Ah! Now I understand!
Förstår du?
Do you understand?
Har ni några frågor?
Do you have any questions?
Titta på sidan 1 i textboken.
Look at page 1 in the textbook.
Läs texten på sidan 2.
Read the text on page 2.
Stäng boken.
Close the book.
Lyssna noga.
Listen carefully.
Lyssna på musiken.
Listen to the music.
Säg efter mig.
Repeat after me.
Skriv ner vad du hör.
Write down what you hear.
Skriv en rapport.
Write a report.
Arbeta i par.
Work in pairs.
Prata svenska!
Speak Swedish.
Kapitel tre är väldigt intressant.
Chapter three is very interesting.
Läs kapitel ett.
Read chapter one.
Sidan var ganska lång.
Hur många kapitel finns det i boken?
How many chapters are there in the book?
The page was quite long.
Vi gick till andra sidan av gatan.
We went to the other side of the street.
Jag kan prata svenska.
I can speak Swedish.
Vi kan gå dit imorgon.
We can go there tomorrow.
Kan du kombinera de här färgerna?
Can you combine these colors?
Det här är ett gammalt foto.
This is an old photo.
Kan du skicka fotot till mig?
Can you send the photo to me?
Det är ett svårt ord.
It is a difficult word.
Kan du stava det ordet?
Can you spell that word?
Vi åt hamburgare till middag.
We had hamburgers for dinner.
Kan jag få en hamburgare utan lök?
Can I have a hamburger without onions?
Han är en advokat.
He is a lawyer.
Hon arbetar som advokat.
She works as a lawyer.
Kan du skala potatisen?
Can you peel the potatoes?
Vi ska äta potatis till middag.
We will eat potatoes for dinner.
Jag glömde min mobil hemma.
I forgot my cell phone at home.
Hon köpte en ny mobil.
She bought a new cell phone.
Jag skrev på pappret.
I wrote on the paper.
Kan du ge mig ett papper?
Can you give me a paper?
Kaffet är varmt.
The coffee is hot.
Jag dricker kaffe varje morgon.
I drink coffee every morning.
Boken ligger på bordet.
The book is on the table.
Har du läst den här boken?
Have you read this book?
Jag läser en bok.
I am reading a book.
Jag älskar kanelbullar.
I love cinnamon buns.
Hon köpte en kanelbulle på bageriet.
She bought a cinnamon bun at the bakery.
Kan jag låna din penna?
Can I borrow your pen?
Jag tappade min penna.
I lost my pen.
Jag dricker vatten varje dag.
I drink water every day.
Hon fyllde flaskan med vatten.
She filled the bottle with water.
Hon har långt hår.
She has long hair.
Det var en lång dag.
It was a long day.
Kan du ge mig ett exempel?
Can you give me an example?
Jag behöver fler exempel.
I need more examples.
Jag går en kurs i svenska.
I am taking a course in Swedish.
Vad heter det på svenska?
What is it called in Swedish?
Vad heter du?
What is your name?
Varifrån kommer du?
Where are you from?
Varifrån känner du henne?
Where do you know her from?
Varifrån kommer det här ljudet?
Where is this sound coming from?
vad bra
that’s great
Vad talar du för språk?
What languages do you speak?
Kan du tala långsammare?
Can you speak slower?
Han talar alltid sanning.
He always tells the truth.
Hon talar flera språk.
She speaks several languages.
Vilka språk talar du?
What languages do you speak?
Jag talar lite spanska.
I speak a little Spanish.
Kan du ge mig lite vatten?
Can you give me some water?
Så klart att jag kommer.
Of course, I will come.
Så klart att vi kan hjälpa dig.
Of course, we can help you.
Vad heter du?
What is your name?
Och du?
And you?
Var är du?
Where are you?
Var bor du?
Where do you live?
Var jobbar du?
Where do you work?
Var ligger skolan?
Where is the school located?
Var ligger närmaste sjukhus?
Where is the nearest hospital?
Norra Sverige är vackert.
Northern Sweden is beautiful.
Vi planerar en resa till Italien.
We are planning a trip to Italy.
Vi kan prata senare.
We can talk later.
Han talar pyttelite svenska.
He speaks a tiny bit of Swedish.
Vad kul!
Great!/How fun!
Lyssna på musiken.
Listen to the music.
Dialogen i filmen var välskriven.
The dialogue in the movie was well-written.
Vilken färg gillar du?
Which color do you like?
Hon har en katt.
She has a cat.`;


(async function () {
    const result = [];


    const lines = text.split('\n');
    for (let i = 0; i < lines.length; i += 2) {
        const text = lines[i];
        const translation = lines[i + 1];
        const audioFileName = `${text
            .replaceAll(' ', '_')
            .replaceAll('.', '')
            .replaceAll('?', '')
            .replaceAll(',', '')}.mp3`;
        const audioTranslationFileName = `translation_${audioFileName}`;


        console.log(text, translation);

        execSync(`say -v Alva "${text}" -o ./text.aiff`);
        execSync(`say -v Alex "${translation}" -o ./translation.aiff`);

        execSync(`ffmpeg -i text.aiff "./audio/phrase/${audioFileName}"`);
        execSync(`ffmpeg -i translation.aiff "./audio/phrase/${audioTranslationFileName}"`);


        result.push({
            text,
            translation,
            audio: `./audio/phrase/${audioFileName}.mp3`,
            audioTranslation: `./audio/phrase/${audioTranslationFileName}`
        })
    }

    fs.writeFileSync('some.json', JSON.stringify(result, null, 2));
})();