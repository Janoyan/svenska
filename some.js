const fs = require('fs');
const axios = require('axios');

async function generateAudio(text, lang, voice, outputFileName) {
    const response = await axios.post('https://speechgen.io/index.php?r=api/text', {
        token: 'ddf440363bd6fba8feaf5a8630ed054f',
        email: 'meruzh2008@gmail.com',
        text: text,
        format: 'mp3',
        lang: lang,
        voice: voice
    });
    const fileUrl = response.data.file;

    // download and save the file
    const writer = fs.createWriteStream(outputFileName);
    const r = await axios({
        url: fileUrl,
        method: 'GET',
        responseType: 'stream'
    });
    r.data.pipe(writer);
    return new Promise((resolve, reject) => {
        writer.on('finish', resolve);
        writer.on('error', reject);
    });
}

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
She has a cat.
Tjena! Hur mår du?
Hi! How are you?
Jag mår bra.
I feel good.
Han mår bättre nu.
He feels better now.
Hur mår du? Bara bra.
How are you? Just fine.
Tack så mycket.
Thank you very much.
Jo tack, det går bra.
Yes, thanks, it's going well.
Jo tack, allt är under kontroll.
Yes, thanks, everything is under control.
Det är bra.
I’m fine.
Hur är läget?
How are things?
Läget är under kontroll.
The situation is under control.
Vad är läget med projektet?
What is the status of the project?
Det är lugnt.
Great, Okay
Han är alltid lugn.
He is always calm.
Du måste göra det själv.
You have to do it yourself.
Vi hade en kanonbra tid på festen.
We had a great time at the party.
Det här är en kanonbra idé.
This is a great idea.
Hejsan!
Hi there!
Hur är det?
How are things?
Fint!
Great!
Allt väl?
All well?
Han mår väl.
He is doing well.
Det är helt sant.
It is completely true.
Hon är helt fantastisk.
She is completely amazing.
Det kostar för mycket pengar.
It costs too much money.
Jag har för mycket arbete.
I have too much work.
Jodå, allt är under kontroll.
Allright, everything is under control.
Jodå, vi kan hjälpa dig.
Allright, we can help you.
Hon kom för sent som vanligt.
She was late as usual.
Det är en vanlig dag.
It is a usual day.
Jag mår så där.
I feel so-so.
Hur var filmen? Den var så där.
How was the movie? It was so-so.
Nja, jag är inte säker.
Well, I'm not sure.
Nja, jag tror inte det.
Well, I don't think so.
Det är ganska kallt ute.
It is quite cold outside.
Hon är ganska trött idag.
She is fairly tired today.
Vädret är dåligt idag.
The weather is bad today.
Hon mår dåligt.
She feels ill.
Det var en dålig idé.
It was a bad idea.
Det är faktiskt sant.
It is actually true.
Det var faktiskt roligt.
It was actually fun.
Jag är förkyld.
I have a cold.
Jag är trött.
I am tired.
Barnen blev trötta efter att ha lekt hela dagen.
The children got tired after playing all day.
God morgon!
Good morning!
Jag är jättetrött idag.
I am really tired today.
Han kände sig jättetrött efter att ha jobbat hela natten.
He felt really tired after working all night.
Oj då!
Oh!
Jag vill dricka vatten.
I want to drink water.
Han dricker kaffe varje morgon.
He drinks coffee every morning.
Kan du hälsa på din mamma från mig?
Can you say hello to your mom from me?
Vi hälsade på varandra.
We greeted each other.
God dag.
Hello.
Han är en god vän.
He is a good friend.
Jag behöver en retur biljett.
I need a return ticket.
Vi planerar en resa till västra Sverige.
We are planning a trip to western Sweden.
Det var ett informellt möte.
It was an informal meeting.
Klädkoden är informell.
The dress code is informal.
Vi hade en formell diskussion.
We had a formal discussion.
De bor tillsammans.
They live together.
Vi arbetar tillsammans.
We work together.
Gör en markering på kartan.
Make a mark on the map.
Han gjorde en markering med pennan.
He made a mark with the pen.
Han betonade vikten av att vara i tid.
He emphasized the importance of being on time.
Intonationen i hans röst var tydlig.
The intonation in his voice was clear.
Mötet är slut nu.
The meeting is over now.
Filmen har ett lyckligt slut.
The movie has a happy ending.
Jag lärde mig en ny fras idag.
I learned a new phrase today.
Den här frasen är svår att förstå.
This phrase is difficult to understand.
Vi ska gå till parken.
We are going to the park.
Jag måste gå nu.
I have to go now.
Hans ton var mycket vänlig.
His tone was very friendly.
Han gick upp för trappan.
He went up the stairs.
Vi måste gå ner till källaren.
We need to go down to the basement.
Kungen talade till folket.
The king spoke to the people.
Det var en gång en kung.
Once upon a time, there was a king.
De är intresserade av konst.
They are interested in art.
Han är en journalist.
He is a journalist.
Journalisten intervjuade politikern.
The journalist interviewed the politician.
Hon har en thailändsk vän.
She has a Thai friend.
Tidningen innehåller många intressanta artiklar.
The newspaper contains many interesting articles.
Vi har inget internetnät hemma.
We have no internet network at home.
Nätet var fullt av fisk.
The net was full of fish.
Norden har vacker natur.
The Nordic countries have beautiful nature.
Barnen trivs i skolan.
The children are happy at school.
Jag trivs bra på mitt jobb.
I thrive at my job.
Hon längtar efter sin familj.
She misses her family.
Han längtar efter att resa.
He longs to travel.
Min familj bor i Sverige.
My family lives in Sweden.
Vi har en stor familj.
We have a large family.
De är goda vänner.
They are good friends.
Jag går ofta till gymmet.
I often go to the gym.
Hon besöker ofta sina föräldrar.
She often visits her parents.
Kan jag låna din telefon?
Can I borrow your phone?
Jag glömde min telefon hemma.
I forgot my phone at home.
Han är en IT-ingenjör.
He is a computer engineer.
Han arbetar på ett spelföretag.
He works at a gaming company.
Vi spelade ett roligt spel igår.
We played a fun game yesterday.
Det här spelet är väldigt populärt.
This game is very popular.
Företaget växer snabbt.
The company is growing rapidly.
Min katt gillar att leka med bollar.
My cat likes to play with balls.
Jag har en katt.
I have a cat.
Solen skiner idag.
The sun is shining today.
Vi njöt av solen på stranden.
We enjoyed the sun at the beach.
Han besöker ibland sina föräldrar.
He sometimes visits his parents.
Ibland känner jag mig trött.
Sometimes I feel tired.
Min mamma är väldigt snäll.
My mom is very kind.
Jag ska besöka min pappa i helgen.
I will visit my dad this weekend.
Jag jobbar fem dagar i veckan.
I work five days a week.
Nästa vecka ska vi resa.
Next week we will travel.
I sommar kommer vi att renovera huset.
This summer we will renovate the house.
I sommar ska jag läsa många böcker.
This summer I will read many books.
det blir
it will be
Jag vill bli läkare.
I want to become a doctor.
Det var en rolig dag.
It was a fun day.
Filmen var väldigt rolig.
The movie was very fun.
Den här deckaren är väldigt populär.
This crime novel is very popular.
Vi hade en trevlig kväll hemma.
We had a nice evening at home.
Han arbetar hemma idag.
He is working from home today.
Skandinavien består av Sverige, Norge och Danmark.
Scandinavia consists of Sweden, Norway, and Denmark.
Har du varit på Island?
Have you been to Iceland?
De har ett självstyrande system.
They have an autonomous system.
Färöarna är kända för sina vackra landskap.
The Faroe Islands are known for their beautiful landscapes.
Grönland är världens största ö.
Greenland is the world's largest island.
Finland är känt för sina tusentals sjöar.
Finland is known for its thousands of lakes.
Åland är en självstyrande del av Finland.
Åland is a self-governing part of Finland.
Jag gillar många sporter, till exempel fotboll och tennis.
I like many sports, for example, football and tennis.
Vi ses imorgon.
We will meet tomorrow.
De ses varje vecka.
They meet every week.
Vi hörs senare.
We will be in touch later.
Vi hörs på telefon.
We will be in touch by phone.
Det var en rolig fest.
It was a fun party.
Vi hade en stor fest igår.
We had a big party yesterday.
Min klasskompis heter Anna.
My classmate's name is Anna.
Välkommen till Sverige.
Welcome to Sweden.
Det här är min bok.
This is my book.
Jag gillar det här huset.
I like this house.
Han är en trevlig person.
He is a nice person.
Vi hade en trevlig kväll.
We had a nice evening.
Jag gillar att läsa.
I like to read.
Det är viktigt att förstå.
It is important to understand.
Vi träffas ofta på kaféet.
We often meet at the café.
Det är en fin dag.
It is a nice day.
Han gav mig en fin present.
He gave me a nice gift.
Lägenheten är mycket stor.
The apartment is very large.
Vi letar efter en lägenhet i stan.
We are looking for an apartment in the city.
Kom in!
Come in!
Hon kom precis i tid.
She arrived exactly on time.
Det är precis samma sak.
It is exactly the same thing.
Förlåt att jag är sen.
I'm sorry that I am late.
Förlåt, jag hörde inte vad du sa.
Sorry, I didn't hear what you said.
Nu förstår jag.
Now I understand.
Jag surfar på webben.
I am browsing the Internet.
Jag läste en intressant artikel i tidningen.
I read an interesting article in the newspaper.
Maten är klar.
The food is ready.
Hon köpte mat från affären.
She bought food from the store.
Vi hade kul tillsammans.
We had fun together.
Det var en kul fest.
It was a fun party.
Jag ska läsa en bok.
I will read a book.
Vi ska resa till Italien.
We will travel to Italy.
Han gick hem.
He went home.
Vi har gått till parken.
We have gone to the park.
Detsamma gäller för dig.
The same applies to you.
Vi ses!
See you!
Just det, vi ska träffas imorgon.
Exactly, we will meet tomorrow.
Ha det så bra!
Be well!
Du med!
You too!
Hej då!
Good bye!
Man får inte ge upp.
One must not give up.
Vi kompletterade projektet i tid.
We completed the project on time.
Jag måste komplettera min uppgift.
I need to complete my assignment.
Varför är du sen?
Why are you late?
Varför är det så kallt?
Why is it so cold?
Vi presenterade vårt projekt.
We introduced our project.
Jag vill presentera mig själv.
I want to introduce myself.
Vi behöver en lista över deltagare.
We need a list of participants.
Hon gjorde en lista över sina favoritböcker.
She made a list of her favorite books.
Jag har en väska.
I have a bag.
Väskan är tung.
The bag is heavy.
Folk gillar att resa.
People like to travel.
Folk från olika länder deltog i evenemanget.
People from different countries participated in the event.
Hon bor på stan.
She lives in the city.
Jag ska gå på stan och shoppa.
I am going downtown to shop.
Stockholm är en stor stad.
Stockholm is a big city.
Min mobiltelefon är trasig.
My cell phone is broken.
Tuggummipaketet är tomt.
The pack of chewing gum is empty.
Jag köpte ett tuggummipaket.
I bought a pack of chewing gum.
Paketet är tomt.
The pack is empty.
Kan du ge mig ett tuggummi?
Can you give me a chewing gum?
Hon läser alltid böcker på sin läsplatta.
She always reads books on her e-reader.
Kan jag låna din kam?
Can I borrow your comb?
Hon tappade sin kam.
She lost her comb.
Ordboken ligger på bordet.
The dictionary is on the table.
Hon har alltid cerat i väskan.
She always has lip balm in her bag.
Hon tappade sin mössa.
She lost her hat.
Han använder en mössa varje vinter.
He uses a hat every winter.
Hon använder alltid ett suddgummi när hon ritar.
She always uses an eraser when she draws.
Tack så mycket.
Thank you very much.
Det var så lite.
It was nothing.
Bilden är suddig.
The picture is blurry.
Jag tog en bild.
I took a picture.
Jag tror på dig.
I believe in you.
Han tror att det är sant.
He thinks it is true.
Hon gillar att diskutera politik.
She likes to discuss politics.
Kan du ge mig ett förslag?
Can you give me a suggestion?
Jag har ett förslag.
I have a suggestion.
Hans respons var positiv.
His response was positive.
Kanske har du rätt.
Maybe you are right.
Kanske kommer jag senare.
Maybe I will come later.
Hon är absolut fantastisk.
She is absolutely amazing.
Det är absolut sant.
It is absolutely true.
Får jag gå nu?
May I go now?
Får jag låna din penna?
May I borrow your pen?
Jag har en sak att säga.
I have a thing to say.
Det är en viktig sak.
It is an important thing.
Har du en bussbiljett?
Do you have a bus ticket?
Jag köpte en bussbiljett.
I bought a bus ticket.
Kan jag låna ditt läppglans?
Can I borrow your lip gloss?
en flaska vatten
a bottle of water
Läsken är kall.
The soft drink is cold.
Han tjänar mycket pengar.
He earns a lot of money.
Jag har inga pengar.
I have no money.
Kan du ge mig nyckeln?
Can you give me the key?
Jag har tappat min nyckel.
I have lost my key.
Jag köpte en ny tröja.
I bought a new sweater.
Tröjan är varm och skön.
The sweater is warm and comfortable.
ett par skor
a pair of shoes
Jag glömde min necessär hemma.
I forgot my toiletry bag at home.
Var är min dator?
Where is my computer?
Kan du fixa min dator?
Can you fix my computer?
Jag behöver ett nytt pass.
I need a new passport.
Har du ditt pass med dig?
Do you have your passport with you?
Jag köpte en ny bil.
I bought a new car.
Hon har en ny telefon.
She has a new phone.
Tavlan är full av text.
The blackboard is full of text.
Det här ordet är ett substantiv.
This word is a noun.
Det här ordet är i singular.
This word is in the singular.
Hon kom utan sin vän.
She came without her friend.
Han gick ut utan sin jacka.
He went out without his jacket.
Kan vi byta platser?
Can we exchange seats?
Jag måste byta kläder.
I need to change clothes.
Hon har en röd halsduk.
She has a red scarf.
Han tappade sin halsduk på bussen.
He lost his scarf on the bus.
Hunden skäller mycket.
The dog barks a lot.
Hunden är väldigt vänlig.
The dog is very friendly.
Jag behöver en penna för att skriva.
I need a pen to write.
Har du läst den här boken?
Have you read this book?
Hon packade sin ryggsäck.
She packed her backpack.
Jag har en ryggsäck.
I have a backpack.
Hon tappade sin handväska på bussen.
She lost her handbag on the bus.
Axelväskan är svart.
The shoulder bag is black.
Kan du bära min resväska?
Can you carry my suitcase?
Hon lade betoning på det viktiga ordet.
She placed emphasis on the important word.
Hon ringade in sitt namn på listan.
She circled her name on the list.
Jag vill göra det igen.
I want to do it again.
Kan du säga det igen?
Can you say that again?
Markera rätt svar.
Mark the correct answer.
Hon uttalade sitt namn tydligt.
She pronounced her name clearly.
Kan du titta på det här?
Can you look at this?
Titta noga på bilden.
Look carefully at the picture.
Rutan är tom.
The box is empty.
Vi bor här.
We live here.
Här är din bok.
Here is your book.
Vi bor nedanför berget.
We live below the mountain.
Bilden är nedanför texten.
The picture is below the text.
Hon såg glad ut.
She looked happy.
Jag kan se dig.
I can see you.
Tack för hjälpen.
Thank you for the help.
Positionen av huset är perfekt.
The position of the house is perfect.
Han har en hög position i företaget.
He has a high position in the company.
Jag läser en bok.
I am reading a book.
Sätt ett kryss i rutan.
Put a tick in the box.
Hon satte sig på stolen.
She sat down on the chair.
Jag ska sätta boken på bordet.
I will put the book on the table.
Alla barnen leker.
All the children are playing.
Alla gillar glass.
Everyone likes ice cream.
Kan jag fråga dig något?
Can I ask you something?
Han svarade inte på telefonen.
He did not answer the phone.
Kan du svara på frågan?
Can you answer the question?
Vi delade upp klassen i grupper.
We divided the class into groups.
Kan du skriva ner det?
Can you write it down?
Kan du stava ditt namn?
Can you spell your name?
Sverige är ett vackert land.
Sweden is a beautiful country.
Vi lär oss franska i skolan.
We are learning French at school.
Vi presenterade vårt projekt.
We introduced our project.
Kan du presentera mig för din vän?
Can you introduce me to your friend?
De pratar med varandra varje dag.
They talk to each other every day.
Kan du säga det igen?
Can you say that again?
Vad vill du säga?
What do you want to say?
Hon är den bästa i klassen.
She is the best in the class.
Boken handlar om en pojke.
The book is about a boy.
De arbetar hårt varje dag.
They work hard every day.
Vi arbetar tillsammans.
We work together.
Hon arbetar som ingenjör.
She works as an engineer.
Han är en ingenjör.
He is an engineer.
Hon arbetar som läkare.
She works as a doctor.
Jag har en tid hos tandläkaren imorgon.
I have an appointment with the dentist tomorrow.
Sjuksköterskan tog hand om patienten.
The nurse took care of the patient.
Vi behöver fler sjuksköterskor på sjukhuset.
We need more nurses at the hospital.
Busschauffören körde oss till skolan.
The bus driver drove us to school.
Busschauffören var mycket vänlig.
The bus driver was very friendly.
Frisören klippte mitt hår.
The hairdresser cut my hair.
Frisören gav mig en ny frisyr.
The hairdresser gave me a new hairstyle.
Vi anlitade en fotograf för bröllopet.
We hired a photographer for the wedding.
Läraren skriver på tavlan.
The teacher is writing on the board.
Läraren gav oss en uppgift.
The teacher gave us an assignment.
Servitören tog vår beställning.
The waiter took our order.
Servitören var mycket vänlig.
The waiter was very friendly.
Kocken lagade en utsökt måltid.
The chef prepared a delicious meal.
Vad ska du göra idag?
What are you going to do today?
Jag måste göra mina läxor.
I have to do my homework.
Då förstod jag allt.
Then I understood everything.
Vad ska du göra då?
What are you going to do then?
Jag studerar svenska.
I am studying Swedish.
De studerar matematik.
They are studying mathematics.
Hon pluggar på universitetet.
She studies at the university.
Min farfar är pensionär.
My grandfather is a pensioner.
Hon blev pensionär förra året.
She retired last year.
Hon jobbar som lärare.
She works as a teacher.
Han jobbar mycket.
He works a lot.
Jag går med dig.
I am going with you.
Han kom med sin hund.
He came with his dog.
Barnet leker i parken.
The child is playing in the park.
Barnen går i skolan.
The children go to school.
De har en bra förskola i området.
They have a good preschool in the area.
Förskolan ligger nära vårt hus.
The preschool is located near our house.
Vi kan börja nu.
We can start now.
Nu förstår jag.
Now I understand.
Jag söker ett jobb.
I am looking for a job.
Hon söker efter sina nycklar.
She is looking for her keys.
Vi åt middag på en restaurang.
We had dinner at a restaurant.
Kan du rekommendera en bra restaurang?
Can you recommend a good restaurant?
Jag önskar dig lycka till.
I wish you good luck.
Lycka till på intervjun.
Good luck with the interview.
Den här meningen är lång.
This sentence is long.
Meningen är korrekt.
The sentence is correct.
Han läser en bok på portugisiska.
He is reading a book in Portuguese.
Hon läser en bok om filosofi.
She is reading a book about philosophy.
Psykologi hjälper oss att förstå mänskligt beteende.
Psychology helps us understand human behavior.
Vad är ditt yrke?
What is your profession?
Vilket yrke vill du ha?
What profession do you want to have?
Ekonomi påverkar alla aspekter av livet.
Economics affects all aspects of life.
Hon arbetar som programmerare.
She works as a programmer.
De anställde en ny programmerare.
They hired a new programmer.
Jag vill bli en ekonom.
I want to become an accountant.
Han arbetar som förskolelärare.
He works as a preschool teacher.
Hon arbetar inom programmering.
She works in programming.
Han studerar programmering på universitetet.
He studies programming at the university.
Han studerar till lärare.
He is studying to be a teacher.
De gick till parken.
They went to the park.
Jag kan höra dig.
I can hear you.
Kan du höra musiken?
Can you hear the music?
Svaret är rätt.
The answer is correct.
Du har rätt.
You are right.
Vi har flera alternativ att välja mellan.
We have several options to choose from.
Vilket alternativ föredrar du?
Which option do you prefer?
Hon arbetar som polis.
She works as a police officer.
Polisen grep tjuven.
The police arrested the thief.
Är du gift?
Are you married?
Hon är gift med en svensk.
She is married to a Swede.
Hon bor med sin sambo.
She lives with her live-in partner.
Min hund är snäll.
My dog is kind.
Han är min man.
He is my husband.
De har varit gifta i tio år.
They have been married for ten years.
Min vän är schweizare.
My friend is Swiss.
Schweizaren talar flera språk.
The Swiss person speaks several languages.
Jag vill gå ut, men det regnar.
I want to go out, but it is raining.
Min son går i skolan.
My son goes to school.
Hon är stolt över sin dotter.
She is proud of her daughter.
De har en son och en dotter.
They have a son and a daughter.
Han talar också svenska.
He also speaks Swedish.
De är också intresserade.
They are also interested.
Min flickvän bor i Stockholm.
My girlfriend lives in Stockholm.
Han köpte en present till sin flickvän.
He bought a gift for his girlfriend.
Han bor nära skolan.
He lives near the school.
De planerar att bo ihop snart.
They are planning to live together soon.
Hon är en toppen vän.
She is a great friend.
Filmen var toppen.
The movie was great.
Ett par skor.
A pair of shoes.
De är ett par.
They are a couple.
De skilde sig förra året.
They got divorced last year.
De bestämde sig för att skilja sig.
They decided to get divorced.
Vi gick till samma skola.
We went to the same school.
Vi har samma åsikt.
We have the same opinion.
Hon är fem år gammal.
She is five years old.
De firar sitt första år tillsammans.
They are celebrating their first year together.
Kvinnan arbetar som läkare.
The woman works as a doctor.
Kvinnan läser en bok.
The woman is reading a book.
Boken är en bra källa till information.
The book is a good source of information.
Han är en pålitlig källa.
He is a reliable source.
Hon är separerad från sin man.
She is separated from her husband.
Min tjej bor i Stockholm.
My girlfriend lives in Stockholm.
Hon köpte en present till sin pojkvän.
She bought a gift for her boyfriend.
Min kille bor i Malmö.
My boyfriend lives in Malmö.
Hans fru är mycket vänlig.
His wife is very kind.
Min fru arbetar som läkare.
My wife works as a doctor.
Pojken har en hund.
The boy has a dog.
Pojken leker i parken.
The boy is playing in the park.
Flickan har en katt.
The girl has a cat.
Hon är en snäll flicka.
She is a kind girl.
Ja, det är jag.
Yes, I am.
Han har ett bonusbarn.
He has a stepchild.
Hon älskar sitt bonusbarn.
She loves her stepchild.
Vi behöver en generell plan.
We need a general plan.
Det här är en generell regel.
This is a general rule.
Hon strök under det viktiga ordet.
She underlined the important word.
Han tog examen från universitetet förra året.
He graduated from the university last year.
Jag studerar vid universitetet.
I study at the university.
Han står nära dörren.
He is standing near the door.
Butiken ligger nära parken.
The store is close to the park.
Hon sorterar böckerna efter färg.
She sorts the books by color.
Det var en lätt fråga.
It was an easy question.
Han har ett lätt jobb.
He has an easy job.
Vi börjar med att lära oss alfabetet.
We start by learning the alphabet.
Kan du stava ditt efternamn?
Can you spell your surname?
Vad är ditt efternamn?
What is your last name?
Hon har en annan åsikt.
She has another opinion.
Jag vill ha en annan bok.
I want another book.
Kan jag använda din telefon?
Can I use your phone?
Hon använder en penna.
She is using a pen.
Vi har en tysk lärare.
We have a German teacher.
Kan du läsa den här texten på tyska?
Can you read this text in German?
De har forskat om klimatförändringar.
They have researched climate change.
Han forskar inom medicin.
He is doing research in medicine.
Institutet har ett gott rykte.
The institute has a good reputation.
Institutet erbjuder många kurser.
The institute offers many courses.`;

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


        console.log(text,'======', translation);

        const audioPath = `./audio/phrases/${audioFileName}`;
        const audioTranslationPath = `./audio/phrases/translation_${audioFileName}`;
        await generateAudio(text, 'sv-SE', 'Mattias',  audioPath);
        await generateAudio(translation, 'en-US', 'Matthew plus',  audioTranslationPath);

        result.push({
            text,
            translation,
            audio: audioPath,
            audioTranslation: audioTranslationPath
        })

        fs.writeFileSync('some.json', JSON.stringify(result, null, 2));
    }
})();