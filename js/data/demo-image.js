export const SAMPLE_IMAGES = [
  { id: 'sample-1',  path: 'images/demo-1/demo-1-a.jpg' },
  { id: 'sample-2',  path: 'images/demo-1/demo-1-b.jpg' },
  { id: 'sample-3',  path: 'images/demo-1/demo-1-c.jpg' },
  { id: 'sample-5',  path: 'images/demo-1/demo-1-e.jpg' },
  { id: 'sample-11', path: 'images/demo-2/demo-2-a.jpg' },
  { id: 'sample-12', path: 'images/demo-2/demo-2-b.jpg' },
  { id: 'sample-13', path: 'images/demo-2/demo-2-c.jpg' },
  { id: 'sample-14', path: 'images/demo-2/demo-2-d.jpg' },
];

// ──────────────────────────────────────────────────────────
// GPT-5.2 Thinking descriptions (one per sample image)
// Used in Section 1: same description → different generators
// ──────────────────────────────────────────────────────────

const GPT52_DESC_SAMPLE1 = `A square-cropped, low-angle exterior photograph shows a modern glass-and-metal high-rise building complex on a city street, with the main tower dominating the left and center of the frame and a second connected glass building on the right. The camera is positioned near street level and tilted upward, making the buildings appear tall and converging toward the top. The sky fills the upper background and is bright blue with many thin, streaky white clouds.

The main building in the center-left has a façade made of a grid of pale blue-green reflective glass windows and light gray metal framing. The windows are arranged in horizontal bands and rectangular panes, with some darker window sections and reflections visible across the surface. Near the top of this tower is a large, dramatic roof overhang extending outward, dark gray underneath and lighter gray on top, creating a strong angular shape. Along the front-right edge of the main tower is a tall vertical orange-brown panel (wood-toned or metal-clad appearance) running upward; on this panel, the word “Concordia” appears in white letters oriented vertically, with a white shield-like logo beneath it.

On the right side of the frame is another glass building section with similar blue-tinted windows and gray framing. It also has a slanted roof element with an orange-brown underside/trim, echoing the main tower’s design. Behind and between the two glass sections, a narrower gray structural core rises, with small rooftop mechanical elements or pipes visible near the top.

The lower portion of the image shows the building podium and street-level entrance area. A broad dark gray horizontal canopy projects outward across the lower center. Beneath and in front of it is a mostly glass entrance façade with large transparent panels and metal mullions. Across the bottom-center glass area, large white block letters spell “CONCORDIA,” partially cropped by the bottom edge of the square frame but still readable. Interior details behind the glass are dim and unclear, with reflections on the glass surfaces.

At the bottom left corner, part of a street intersection is visible: a vertical traffic light pole with a three-light signal (red/yellow/green lenses visible), additional street signage mounted below, and a curved streetlamp or pole extending upward. Some small signs and symbols near the corner are present but too small to read clearly. A small portion of another lighter-colored building appears along the far left edge, partly hidden behind the main tower. In the lower-right corner, there are tree branches with yellow-orange leaves, indicating autumn foliage.

The lighting is bright daylight, likely direct sun, creating crisp highlights on the glass and metal and strong contrast between sunlit surfaces and shaded undersides of the canopies and roof overhangs. The color palette is dominated by sky blue, blue-green glass, gray metal, dark charcoal shadows, and orange-brown accent panels. Materials visible include reflective glass, metal framing, concrete or composite cladding, and transparent entrance glazing. The overall composition is architectural and symmetrical-leaning but slightly angled, with the tallest tower centered left and the secondary tower balancing the right side. The visible text is “Concordia” vertically on the orange-brown panel and “CONCORDIA” in large white letters at street level. This appears to be a Concordia University building, with the Concordia name clearly visible.`;

const GPT52_DESC_SAMPLE2 = `A square, high-angle telephoto cityscape photograph shows a dense downtown area filled with mid-rise and high-rise buildings, viewed from far above street level. The central subject is a tall, narrow beige building near the middle of the frame, whose large side wall is covered by a sepia-toned mural portrait of an older man wearing a fedora and suit jacket. The mural shows the man from about the chest up, facing slightly toward the camera, with one hand placed across his chest; the fingers have a faint reddish-pink tint. The portrait is rendered in soft brown-gray shading on a light cream/beige wall, and the wall occupies a large vertical rectangle in the center. Along both sides of this mural building, dark stacked balcony or fire-escape-like structures run vertically, creating jagged dark edges. On the roof of the mural building are small rooftop elements and vents.

To the left of center, a tall white/gray office building with a strict rectangular window grid rises from the lower edge and extends toward the upper half. Its facade has many narrow vertical window bays in repeating rows, with light concrete or painted framing. Behind and farther left, a dark glass tower with reflective windows occupies the left edge of the frame; it is partially cropped and shows a grid of dark blue-black glass panels. Behind the mural building, in the upper middle background, there is another modern building with horizontal bands of glass and dark framing, plus a stepped dark stair/balcony structure on its left side.

To the right of the mural building, several brick and mixed-material buildings fill the frame: a red-brick mid-rise with balconies and white-trimmed windows sits mid-right, and a taller red-brown brick building with evenly spaced windows stands near the upper-right edge. In the top background, additional low-rise residential-looking buildings with brown roofs and many small rooftop elements are visible, along with leafless or sparse trees in muted green-yellow and gray tones. There is no visible sky in the square crop; the entire frame is filled by buildings and rooftops.

The lower half of the image is crowded with flat rooftops in gray, white, and black, covered with HVAC units, ducts, vents, pipes, and small rooftop structures. Near the bottom center-right, an ornate tan stone tower-like facade with an arched opening and decorative masonry stands out among simpler roofs; it has a darker roof cap and carved architectural details. Near the lower-left center, a narrow street runs between buildings toward the mural building, creating a vertical corridor. Tiny cars are visible along the street and near an intersection at the bottom-left area, with a few traffic lights and poles. A round sign with a red border is mounted on a pole near the street, but the details are too small to read. At the far left edge, a partial blue sign or lettering is visible on a building, but the text is cut off and unreadable.

Lighting is soft and diffuse daylight, likely overcast or lightly hazy, with low contrast and muted colors. The palette is dominated by beige, gray, white, black, brick red, and dark blue-gray glass. Surfaces include painted masonry (mural wall), glass curtain walls, brick facades, concrete/stone cladding, and metal rooftop equipment. The image appears sharply focused overall, with compressed perspective that makes the buildings look tightly packed. This appears to be downtown Montreal, recognizable by the well-known large mural on the central building wall, but no readable location text is visible in the image.`;

const GPT52_DESC_SAMPLE3 = `A square, close-to-mid distance indoor photo shows a large black chalkboard mounted on a red wall, viewed almost straight-on with a slight upward angle so the top wall area is visible. The chalkboard fills most of the frame, spanning nearly the full width, with a thick black metal frame and visible chalk dust and smudged eraser marks across the dark surface. Above the board, in the top-left corner, there is a red LED digital clock displaying "19:35" in bright segmented numerals. The clock sits on or just above a small light-colored shelf/platform with a black support bracket underneath, and there is a dark housing behind it. The wall behind and above the board is painted a strong red and has thick horizontal and vertical structural elements or beams; the paint has a few chipped spots and scuffs, including a noticeable gray chipped patch near the upper center-right. A soft bright vertical light reflection runs down the red wall near the center top.

The chalkboard contains dense white chalk writing organized into several columns and sections. On the left half, near the top, there is a faint underlined line of text in French (partly unclear, appears to start with "Jeudi…"), and below it a boxed label that looks like "WOD." Under that are lines of handwritten workout-style notes and bullet points; some readable words include "AMRAP 18," "OKS," "T2B," and "Pistols," with additional numbers and abbreviations that are partly unclear. Farther down on the left side is a clearly underlined heading "Technique," and beneath it two bullet points, one reading approximately "BAR M/U / CTB / Pull-up" (some letters unclear) and another "Pistol." Below that, near the lower-left quadrant, there is another boxed time-like notation reading approximately "13'30" and a vertical list of names with scores/times next to them. Several names are readable or partly readable, including "Pierre," "Michael," "Romina," "Hafsa," "Alessandro," and "Maxime," each followed by numbers and symbols (for example "5," "3+28," "6+20," "5x8," "5," "5+18"), with some side notes like "95" and other smaller text that is unclear.

The center of the board contains a tall column of names and times/scores written in chalk, separated by braces and small boxed markers. Near the top-center is a boxed time-like notation that looks like "17'30," and to the left of it another small boxed note. Multiple names are listed vertically with numbers next to them, including entries that appear to be "Lili," "Audrey," and many others; much of this handwriting is hard to read exactly. Mid-center and lower-center there are additional boxed labels such as "110#" and another smaller boxed note below it, plus many names and times in a stacked list. Some names are more readable, such as "Ilona," "Axel," and a final line that looks like "Thomas" (unclear spelling), each followed by time-like values such as "4:28," "4:26," and "6:45" (exact digits in some entries are uncertain). White chalk braces group several names in the upper-middle area, and there are lots of overwriting and chalk smears.

On the right side of the chalkboard, there is another structured section with a boxed heading "HYROX" and, to its right, another boxed heading that appears to read "T.C.L" (partly cut off by the frame edge). Beneath are multiple lines of chalk text and numbers arranged like workout instructions. Some fragments are readable, including "2 x 19 min," "400 m Run / 200 m Row" (partly unclear), "Burpees," "Rest 2 min," and a numbered section marker "2" in a small box. Lower down, there is an underlined "Warm-up:" line followed by more handwritten items and counts, including text fragments like "AMRAP 9 min," "10 Squat…," "10 Push-Ups," and "10 Burpees," with some words obscured or hard to decipher. Near the bottom-right area of the board, a name written large in chalk (appears to be "Yannick" or similar, unclear) is followed by a time-like score "6:54…" with the last character uncertain.

At the very bottom-right corner of the image, in front of the board on a ledge or narrow surface, there is a small translucent plastic cup. Along the bottom edge near the center, a small white object (possibly paper or cloth) peeks into frame. The lighting is indoor and somewhat warm overall, but the red wall and white chalk create strong contrast. The dominant colors are red (wall), black/dark gray (chalkboard and frame), and white (chalk text), with minor beige/light wood tones in the shelf and a translucent gray-white cup. The scene contains no visible people, and no recognizable location is identifiable from the image.`;

const GPT52_DESC_SAMPLE5 = `A square indoor photograph shows a white tabletop or console surface with decorative and household objects arranged in front of a large round wall mirror. The camera is positioned at close to medium distance and slightly above the surface, angled downward. The scene is brightly lit with soft daylight, with no strong harsh shadows. The color palette is mostly white, beige, light wood, and gray, with strong accents of red, green, purple, and black.

The largest object is a circular mirror with a thin gold/brass-colored metal frame. The mirror fills most of the center and upper half of the image, with its curved rim visible from the lower left across the top and down the right side. In the mirror reflection, a red flowering plant with green leaves (poinsettia-like) in a glossy red pot is centered near the top-middle. The reflected plant has multiple bright red bracts and dark green leaves, with stems visible above dark soil. Behind the reflected plant, the reflection shows part of a light wood dining chair with horizontal slats and part of a matching wooden table on the left side. The reflected background wall is white and clean. The reflection also shows a pair of dark sunglasses with red temple tips resting on a pale rectangular surface near the lower left inside the mirror, and part of a checkered wooden board/tray pattern near the lower center-left of the reflection.

In the actual (non-reflected) foreground at the bottom left, there is a matte beige ceramic vase with a rounded body and narrow neck. It contains a dense bunch of dried purple flower stems (lavender-like), with many thin stalks and small clustered buds. Some pale string or twine is tangled among the stems. The vase sits on the white surface, and a white cable curves along the tabletop nearby.

Near the lower center, slightly to the right of the vase, there is a small off-white ceramic plant pot containing a smaller plant with sparse green leaves and exposed pale roots draping over the rim. Several roots are thick and curved, hanging downward. A thin brown stem rises from the pot with a dark clip or tie attached. The pot sits directly on the white surface, and a white cable loops behind it.

At center-right, leaning against the mirror base, there is a small white smart display/tablet on a stand in landscape orientation. Its screen shows a bright outdoor landscape or city view image. In the lower-left corner of the screen, the time "7:49" is visible in white text. Smaller icons/text in the top-right area of the screen are present but unclear. Behind this display, a red rectangular box/package is partially visible, leaning upright. The visible text on it reads "LASER GAME" in white letters and "EVOLUTION" below it (partially obscured but readable). The box also has black and white graphic elements.

To the right of the smart display, on the white surface near the wall, there is a square analog timer or clock with a black frame and a white face. It is slightly tilted back. The face has black minute markings and black numbers around the edge in increments, with a red spiral or circular symbol in the center and a red hand/indicator. The numbers "55," "50," "45," "40," "35," "30," "25," "20," "15," "10," and "5" are visible around the dial. Behind it on the wall is a white electrical outlet with a gray plug inserted, and a gray cable loops upward and then downward.

At the far right edge of the image, a second view of the same red flowering plant appears outside the mirror (the actual plant), partially cropped by the frame. It sits in a glossy red pot with dark vertical streaking and black upper rim, showing red bracts and green leaves. The pot rests on the white surface. Behind it is a tall white/gray curved device or appliance, partially visible and cropped by the top and right edges. Another similar white/gray curved device appears nearer the center-right behind the mirror edge.

In the lower right foreground, there is a rectangular wooden tray or board with a raised edge and a handle cutout. The top surface has a checkerboard/parquet-like pattern of square wood pieces in different brown tones. On top of this tray lies an open lined notebook or pad of paper, white with faint horizontal lines. There is light handwritten text and sketching on the pages, but most writing is too small to read clearly. A pair of dark sunglasses with black lenses and red temple tips rests across the open notebook. The glasses are angled diagonally, with one lens closer to the center and the arms pointing toward the lower right. The sunglasses appear again in the mirror reflection on the left side due to the mirror.

The tabletop surface is white with subtle gray and beige veining, suggesting stone or marble-like material. The walls are white and gray, with clean edges and corners. No people are visible. No recognizable location is shown.`;

const GPT52_DESC_SAMPLE7 = `A square, close-up overhead photograph shows several handmade paper crafts and drawings arranged on a medium-to-dark brown wooden tabletop with visible wood grain, scratches, and small paint specks. The composition is viewed almost straight down. A large rectangular sheet of brown kraft paper/cardstock fills most of the upper half of the frame, with narrow strips of the wooden table visible along the left edge, right edge, and top-right area. Across the lower half is a large white folded paper sheet with a vertical crease near the center and a slightly curved bottom edge. A smaller white paper drawing with light blue crayon shading is placed on top at the right-center, overlapping both the brown cardstock and the white sheet below.

On the brown cardstock at the top are two cut-paper heart-shaped characters made from patterned paper. The left character is a pale yellow heart with tiny white heart motifs, positioned left of center. It has two plastic googly eyes (one on each side of the upper-middle area), two short white paper arm strips with blue heart-like marks extending diagonally outward, and two rectangular white paper leg pieces with blue heart-like marks at the bottom. The right character is a larger purple-and-pink patterned heart (covered in dense circular dot shapes in purple, pink, and some blue tones), positioned near the top center-right. It also has two googly eyes and paper limbs: pale yellow patterned arm strips extending left and right, and white leg pieces with blue heart-like marks at the bottom. The smaller blue drawing paper overlaps the lower-right portion of this purple heart character, covering part of its body and one leg. The googly eyes on both heart characters are slightly raised and glossy, with small shadows underneath.

The smaller paper on the right-center contains a crayon drawing of a single human-like figure against a heavily scribbled light blue background. The paper has a visible vertical fold/crease line running down near the center and a slight horizontal bend near the top edge. The drawn figure is centered: a yellow face and yellow arms, long dark brown hair extending diagonally down on both sides, a pink short-sleeved shirt, and purple pants with one leg drawn forward and one back. The face has simple outlined eyes and a small curved red/pink mouth. The blue crayon background is textured with layered strokes and uneven pressure, and the lower edge of this drawing sheet casts a slight shadow on the paper beneath.

On the large white paper underneath, the left half contains handwritten pencil text in large uneven letters and a colorful rainbow drawing below it. The text appears to be in French and is written in several lines; clearly visible words include "MAMAN," "Je-tAIME" (with a small pencil heart drawn above/near the line), and "PAPA," while several middle lines are partially unclear or misspelled and difficult to read. Below the text is a pale purple heart-shaped painted or stamped form with scattered darker purple speckles. At the bottom-left is a large rainbow made with thick marker bands, stacked in curved arcs. The outer band is red, followed by orange, yellow, a light yellow-green band, light blue, dark green, bright pink, and a small dark blue center. The marker strokes are visible, uneven, and glossy in places.

On the lower-right portion of the white paper (partly hidden by the blue drawing sheet), there is a second drawing made with marker and pencil/pen. Two tall curved arch-like bands rise from the bottom edge, one bright pink and one dark blue, forming a doorway-like shape around a white central area. A red heart shape is drawn near the top center inside the arch. Near the bottom center are two simple stick-figure people outlined in gray pencil/pen, standing side by side and holding hands; the left figure is taller, the right figure is shorter. The lower-right white paper corner is visible, and the wooden table shows along the bottom and right borders. The lighting is soft and even, likely natural light, with gentle shadows from the paper layers and a slight sheen on the googly eyes and marker ink. No logos or printed brand text are visible.`;

const GPT52_DESC_SAMPLE8 = `A square color photograph shows the top surface of a white dresser or cabinet viewed from a slightly high angle at close to medium distance, with the camera looking downward across the tabletop toward a plain light gray wall in the background. The image is sharply focused on objects arranged across the white surface. The lighting is soft indoor light, likely daylight from the left side, creating mild shadows and bright reflections, especially on glossy plastic and the black sphere. The overall color palette is mostly white, gray, black, and muted plastic tones, with bright accents of pink, green, tan, and orange.

The tabletop is filled mainly with toy building-brick constructions and small toy figures. In the left-middle area sits a glossy black spherical object about the size of a small ball, with a white circular patch on top containing a black number "8" in a simple outlined style. The sphere has strong reflections showing a window-like shape and room reflections on its shiny surface. In front of and slightly right of the sphere is a gray building-brick base structure occupying much of the lower-left and center-left area. This gray structure is made of interlocking plastic bricks in light gray and dark gray, with a rectangular layout and open sections. It includes a round gray platform on the lower-left side with a small tan square tile on top, several curved gray tube-like pieces, a small orange translucent stud near the bottom edge, a narrow walkway-like extension projecting downward toward the bottom center, and low walls around the perimeter. A long thin dark gray strip or beam lies across the upper edge of this gray section, running roughly left to right. Small brown cylindrical pieces are attached near the upper-left and upper-center portions of the gray build. The plastic surfaces are matte to semi-gloss with visible studs.

To the right of the gray build is a larger multicolored building-brick structure occupying the center-right and right-middle area. It stands taller than the gray base and includes white, gray, dark gray, brown, and green pieces. The lower part sits on a green patterned baseplate with a mottled dark green and black print. Along the front edge of this structure are stacked tan sandbag-shaped pieces forming a low barrier. Vertical posts and beams rise upward, including dark gray cylindrical columns, white wall sections, and a gray frame on the right side with an X-brace pattern. A brown vertical beam or plank is visible near the front-right support. The top includes white brick sections and a strip of brown plates near the upper-right edge. Inside the structure, darker pieces and a lime-green accent are visible, with an open, unfinished look and exposed studs. A second white wall-like section runs along the back-right edge of the tabletop behind this structure.

Behind the main builds, along the back center near the wall, there is a row of small blocky toy figurines and mini models on round gray bases, arranged loosely from left to right. There appear to be around a dozen or more small figures in mixed colors including gray, black, brown, green, blue, and orange. Some look humanoid and some are unclear, with one green figure near the center-back standing taller than the others. They are placed in a shallow line and are partially obscured by the larger structure in front.

In the front-right foreground, overlapping the white tabletop and partly in front of the tan sandbag pieces, there is a large butterfly-shaped decoration or cutout. It is mostly black with vivid pink and magenta wing areas, plus yellow spots and some white speckled dots. The butterfly appears layered, with one wing section lifted slightly, giving a dimensional paper or plastic appearance. The butterfly is angled diagonally, with its body pointing toward the lower-right.

On the far right side of the tabletop, near the edge, lies a pink harmonica placed horizontally, with silver metal top plates and a row of rectangular air holes visible along the side. Faint cursive text is visible on the metal surface but is unclear. Behind the harmonica, near the back-right corner, there is a folded or crumpled piece of white paper resting on the tabletop, partly tucked against the wall and edge.

At the far left edge, only partially visible, there is another small building-brick structure with tan and green pieces, cut off by the frame. The white tabletop itself is smooth and glossy with slight shadows and reflections. At the bottom edge of the image, the top front of the dresser is visible with a single round silver drawer knob centered near the lower edge. The drawer below is slightly open, revealing a dark interior with blue fabric or clothing visible inside. The background wall is plain and unadorned, light gray, and evenly lit, with no visible text or decorations. No people are present.`;


// ──────────────────────────────────────────────────────────
// Section 2 descriptions: different models describe demo-2 images
// Row 1: child's palm tree drawing  |  Row 2: basement table
// ──────────────────────────────────────────────────────────

const COPILOT_DESC_PALMS = `A square-cropped view of a hand‑drawn illustration made with markers. The drawing shows two palm trees positioned in the lower half of the image. Each tree has a light brown trunk with a crisscross pattern drawn in darker brown. The trunks extend upward into large, green, star‑shaped clusters of palm leaves. The tree on the left is slightly lower in the frame, and the tree on the right is slightly higher and more centered.

Below the trees, across the bottom edge, there is a horizontal band of blue representing water. The blue area is filled with overlapping marker strokes in dark and light tones, with some curved vertical lines suggesting texture.

The background behind and above the trees is filled with pink and purple marker strokes, unevenly blended. In the upper right corner is a bright yellow sun, drawn as a simple circle with straight lines radiating outward. The sun is partially cropped by the edge of the image.

The composition is simple and centered, with the camera viewpoint appearing straight-on and at a close distance, capturing the full drawing without showing anything beyond the paper surface. The surface texture of the paper is visible where marker strokes overlap. No text or logos appear.`;

const GEMINI_PRO_DESC_PALMS = `A 1:1 square crop of a child-style hand-drawn marker illustration on paper. The scene depicts a landscape with two palm trees, water, and a sun. At the bottom, occupying approximately the lower fourth of the image, is a horizontal band of water rendered in dense, tightly scribbled teal and blue-green marker lines. Rising from this bottom area are two palm trees. The palm tree on the left is positioned close to the edge and its green fronds are partially cut off by the left boundary of the frame. Its trunk is colored light orange-brown with dark brown intersecting diagonal lines forming a criss-cross diamond pattern. Its leaves are a cluster of solid green, jagged, pointed shapes colored with heavy marker strokes. The second palm tree is positioned near the center. It has a slightly taller orange-brown trunk with the identical dark brown criss-cross pattern, and its green fronds spread out in a large, star-like burst with approximately seven distinct, pointed sections. The background is a sky filled with energetic, overlapping, broadly angled marker strokes in varying shades of bright pink, magenta, and light purple. In the top right corner, there is a bright yellow sun consisting of a solid yellow circle with roughly eight yellow radiating line segments extending outwards. The paper immediately surrounding the sun is left largely uncolored white, creating a halo effect around the yellow shape. The physical texture of the paper and the overlapping, streaky ink of the colored markers are prominently visible throughout the entire drawing, including a faint, faded circular liquid stain or ink drop in the top left quadrant of the pink sky. The viewpoint is a flat, straight-on two-dimensional perspective with even lighting typical of a scanned or directly photographed flat paper drawing.`;

const GPT52_DESC_PALMS = `A square close-up photograph shows a childlike hand-painted drawing on white paper, filling the entire frame. The visible scene is a simple tropical-style landscape illustration with two stylized palm trees, a pink and purple sky, a blue horizontal band at the bottom, and a partial yellow sun in the upper-right corner. The camera is positioned straight above or nearly straight-on to the paper, and the image is cropped tightly so parts of the trees and sun are cut off by the frame edges. Lighting is even and soft, with no strong shadows, and the paper texture and brush/marker/crayon strokes are clearly visible.

The background is mostly a pink wash with variations from hot pink to light pink and lavender-purple, with visible streaky brush strokes and uneven watercolor-like blending. In the upper-left area, there is a faint curved pink arc shape, and nearby a small pale pink cloud-like blotch with scalloped edges. The top edge of the paper is visible as a thin strip, with a beige or gray surface beyond it.

There are two palm-tree-like forms in the foreground/middle. The left tree is partially cut off by the left edge. It has a narrow orange-brown trunk with pink fill and darker brown crisscross lines making diamond shapes. Its canopy is dark green with several broad pointed leaves radiating outward; the leaf cluster is partially cropped and overlaps the pink background. The right tree is larger and more centered, with a similar orange-brown trunk and pink interior, also decorated with darker brown diagonal crosshatching. Its green canopy is star-shaped with about six broad pointed leaves, painted in layered dark and medium green strokes with visible lighter streaks where the brush skipped. The center of the canopy is darker and denser, and the leaves overlap each other.

Along the bottom of the image, a horizontal blue band spans the width of the frame, painted in teal-blue and darker blue with horizontal line strokes and uneven shading. It reads as water or a flat ground band, but only the painted band is literally visible. The trunks extend down into this blue band and are cropped by the bottom edge.

In the upper-right corner, a partial yellow sun is visible, cut off by the top and right edges. It is painted as a yellow circular shape with multiple short yellow rays extending outward. No text, logos, or recognizable real-world location are visible. The overall palette is bright pink, purple, green, blue, yellow, orange-brown, and white, with a handmade mixed-media look and clearly visible brush/marker texture.`;

const COPILOT_DESC_TAB2 = `A cluttered indoor scene shows a wooden table positioned against an unfinished concrete wall. The surface of the table is crowded with various toys, board games, and miscellaneous household items. In the left foreground, a yellow plastic tray contains multiple small toys, including a translucent yellow creature-shaped item and several colorful packaged objects. A small red-and-white spherical object resembling a toy sits near the front left corner of the table. To the right of the yellow tray, there is a dark gray plastic container with multiple sections, partially filled with additional toys or parts. A small red rectangular box with "UNO" on it is positioned near the front center edge of the table.

A stack of board games is arranged toward the right side of the table and extending upward. The stack contains roughly a dozen or more boxes in varying sizes and colors. Some of the visible titles include "Hedbanz," "Battleship," "Operation," "Jenga," "Double Ditto," "Laughcronyms," and others. At the top of the stack is a large pile of white rectangular objects resembling playing cards or tiles arranged into a square formation. Additional board games, such as "Deep Freeze," appear on the table surface just below the main stack.

Near the right side of the table surface, a blue rectangular foam block sits beside a roll of gray duct tape. The table has two wooden drawers beneath the surface. Partially obstructing the view of the drawers is a dark-colored padded item draped over the front right area; it appears to be soft gear or possibly exercise equipment padding.

In front of the table, two dark wooden chairs with horizontal-slat backs are visible, one more prominently in the foreground, slightly angled to the right.

In the background on the right side of the frame, an exercise treadmill is positioned perpendicular to the table. The treadmill console is visible, with buttons, a screen, and cup holders. Underneath the treadmill's side rails, shelves contain various stored items, including containers and tools. The treadmill brand "SOLE" is partially visible on the frame.

Lighting appears to come from an overhead artificial source, casting distinct shadows on the wall and objects. The color palette consists mostly of muted neutrals—browns, grays, and blacks—contrasted by the bright, multicolored board game boxes and toys. The textures range from smooth plastic and cardboard to the rough unfinished concrete of the wall. The camera angle appears to be slightly elevated, looking down at the table and objects from a moderate distance, with the entire scene cropped into a square composition.`;

const GEMINI_PRO_DESC_TAB2 = `A slightly high-angle, medium-distance shot captures a heavily cluttered wooden desk in an unfinished room, likely a basement, with rough, grey concrete walls. A vertical wooden stud runs down the concrete wall on the left, holding a thin blue wire. The lighting appears artificial, casting strong shadows to the left, including a prominent shadow from a tall stack of boxes onto the concrete wall. The color palette contrasts the drab grey walls and brown wood furniture with highly saturated red, yellow, and blue plastic toys and packaging. The desk features two small drawers with round brass knobs. Pushed against the front edge of the desk are two black wooden chairs with slatted backs. The chair on the lower right holds a black backpack with grey reflective stripes. On the desk surface, the left side is dominated by a bright yellow plastic tub containing a translucent golden plastic dragon toy, a yellow Beyblade Burst package, and a clear plastic bag of Meccano parts with a visible instruction booklet. Under the tub sit a purple box and a green box. Near the front left edge of the desk rests a red and white Pokeball. In the center foreground sits a small red plastic barn toy with a brown roof and the text UNO MOO!. Behind the barn is a dark grey plastic toy ramp with the partial word mpire and red and yellow graphics. To the right of the barn are a solid bright blue rectangular block and a roll of silver duct tape. The right side of the desk supports a tall, leaning tower of boxed toys and games. From bottom to top, the visible boxes include a blue Lego Gadgets box, a large red box with a dragon graphic, a grey Mecanique box, several dark-colored boxes with text including 12 Hydraulique Solaire, a purple box, a white box reading Decouvre la lumiere, and a red and white Meccano box. Perched at the very top of this stack is a wide, disorganized pile of numerous flat, light-wood building blocks. On the far right edge of the frame, a black Sole brand treadmill is partially visible, showing the control console and handles. The composition is densely packed, filling the square frame completely.`;

const GPT52_DESC_TAB2 = `A square 1:1 color photograph shows a cluttered indoor storage/work area with an unfinished gray concrete wall in the background and a medium-brown wooden table filling most of the lower half and center of the frame. The camera is positioned at about standing height and angled slightly downward toward the tabletop, with the view looking into a corner where the wall meets a large exercise machine on the right. The lighting is harsh and frontal, like direct flash, creating bright highlights on plastic and glossy boxes and casting hard-edged shadows of the stacked objects and machine onto the wall.

The background wall is bare gray concrete with visible cracks, stains, rough texture, and uneven patches. Near the center-left, a vertical narrow wooden strip is mounted against the wall, and a blue cable runs down it, held by several small metal clips. A broad shadow band stretches horizontally across the wall from the right side. The wall occupies most of the upper left and upper middle of the image.

On the table, near the back center-right, there is a tall stack of boxed items (roughly 14–16 boxes) rising upward almost to the top edge of the frame. On top of this stack sits a large layer of many small white rectangular pieces arranged in a staggered pattern, resembling dozens of short tiles or block-like pieces, with a few pastel-colored pieces visible at the very top. Below those white pieces are several boxed kits and games. One large white box near the top has French text clearly visible, including "DÉCOUVRE LA LUMIÈRE" and smaller text "LES ARTS ET LE MOUVEMENT," with a blue/yellow "SID" logo on the right side and a red side panel with a white "M" shape; "MECCANO"/"MECANO" text is also visible on different sides. Beneath it are darker boxes in black, purple, and gray; one black/yellow box has visible French text "HYDRAULIQUE EN SOLAIRE" and "12 en 1," and another dark box shows a "LEGO"/"TECHNIC" logo on the side. A gray box lower in the stack shows "MÉCANIQUE" and a large yellow "5." A bright red Pokémon-branded box sits lower and angled outward, with "Pokémon" visible and cartoon characters printed on it. Directly under that is a blue box with large white text "LEGO GADGETS" and the "KLUTZ" logo. Several other boxes have partial text or illustrations but are too small or partially blocked to read clearly.

In the foreground left on the table is a bright yellow plastic Beyblade stadium/tray (octagonal shape with raised sides) with the "BEYBLADE BURST" logo visible on an inner wall. Inside it are mixed small toy/building parts, mostly blue, red, silver, and black pieces. A clear zip-top plastic bag lies across the tray, containing a red instruction booklet or insert with a picture of a blue/red vehicle and partial readable text "MOTOR…" and "2," while the rest is unclear. Also inside the tray is a translucent amber/yellow plastic toy piece shaped like an animal or creature head with a printed cartoon eye. The tray sits on top of a stack of colorful boxes/books; the top visible one is purple/blue with floral or decorative graphics and a bicycle illustration, and a yellow box peeks out below with partial text "prescho…" visible (rest unclear). A red-and-white Poké Ball-like toy ball sits under the edge of this stack near the front-left corner of the table, partly tucked beneath the boxes.

Leaning between the yellow tray and the tall box stack is a dark gray and black package or folder with angular graphics and orange/red artwork; large white letters "...PIRE" are visible (first letters obscured). Behind it, a small red toy figure or object sticks up near the center of the table, partly hidden by boxes.

Near the front-center of the table is a small red "UNO MOO!" box shaped like a barn, with a printed brown shingle roof pattern and a handle slot on top. The round "UNO MOO!" logo is centered on the upper front, and three small square "window" graphics with animal faces are visible on the front. To the right of the stacked boxes is a bright blue rectangular plastic container or case lying on its side. Farther right on the tabletop is a roll of gray duct tape with a white/red inner label.

The table itself is medium brown wood with visible grain and wear. A single drawer is visible on the right front side with a small round brass-colored knob, and a second drawer seam is visible to its left. The table legs are simple wood supports.

Two black chairs are visible in the foreground and right side. One chair back is close to the camera at the bottom center, with curved horizontal slats and squared posts. A second black chair is on the right under the table; its seat holds a crumpled black garment or bag, and a pair of over-ear headphones with black earcups and silver/gray rings is visible resting on top. Some straps and buckles hang down from the black item.

On the right side of the image is a large dark treadmill or exercise machine occupying the upper-right and middle-right area. Its console is angled upward and has a large dark screen surrounded by rows of buttons. The brand name "SOLE" is visible below the screen. The treadmill control deck has cup holders and compartments, with a red safety key or button and a black cord visible near the center. Part of the machine frame at the right edge shows large partial white letters "SO..." (rest cut off). Behind and above the treadmill is a white shelving unit. On the shelf, a purple-and-blue box with a white/yellow "plus" logo is visible. Below it are translucent storage bins and other items, mostly unclear.

The overall color palette is muted gray and brown in the room structure (concrete wall and wood table), contrasted by bright toy and game packaging colors (yellow tray, red boxes, blue case, purple boxes). Surfaces include rough concrete, smooth glossy cardboard, shiny plastic, matte black metal/plastic on the treadmill and chairs, and soft fabric on the black bag/clothing. No people are present, and no outdoor elements are visible.`;

// ──────────────────────────────────────────────────────────
// Row 3: gym / weight room  |  Row 4: chalkboard
// ──────────────────────────────────────────────────────────

const COPILOT_DESC_GYM = `The image shows a small gym room containing multiple pieces of weightlifting equipment. The viewpoint is from a standing position at approximately eye level, looking slightly downward toward the equipment. The framing is tight, capturing mostly the central and right portions of the room, with the left side partially visible in a mirror.

The central subject is a white metal squat rack occupying most of the foreground. It has vertical posts with evenly spaced adjustment holes and a horizontal barbell resting on hooks near the middle. The barbell has no visible plates on it. Directly behind and to the right of the white rack is a black metal power rack or squat stand with several weight plates stored on pegs. The plates are black and appear in various sizes; there are approximately eight to ten visible plates stacked on the right side of the black rack. The black rack also holds a barbell, which has multiple black plates loaded on it.

In the lower foreground, slightly left of center, a barbell with two large black plates rests on the floor. The floor is covered with black textured rubber matting.

To the left of the white squat rack is a bench with an attached preacher curl arm pad and bar holder. The bench frame is white, and the padding is dark blue or black. A small curl bar with black plates is resting on the arm of the bench setup. Several additional plates are scattered or stored in the vicinity.

In the background on the left wall, a large rectangular mirror spans a significant portion of the wall. The mirror reflects more weight plates stored on a vertical rack, pipes and ceiling structures, part of the window, and other areas of the gym.

Behind the racks near the wall, a circular metal object resembling a plate-loaded adjustable support or stand is leaning upright. There are two red spring clamps attached to the supporting rod. The surrounding walls are light gray or off\u2011white with some scuff marks.

The ceiling contains exposed pipes and ducts painted white. The lighting is bright and natural, with daylight entering from an unseen window reflected in the mirror, creating soft shadows and evenly illuminating the equipment. The color palette consists mostly of whites, blacks, grays, and muted tones from the metal and rubber surfaces.`;

const GEMINI_PRO_DESC_GYM = `This is an eye-level, mid-range shot of a utilitarian gym space framed in a square aspect ratio. The room features flat white walls, a black rubber floor with a raised diamond-plate texture, and exposed white pipes running horizontally along the upper wall and ceiling. The lighting is bright and appears to be natural ambient daylight coming from a window that is visible only in the reflection of a large rectangular mirror mounted on the left wall. The dominant colors are white, black, and metallic silver, with small accents of blue and red. In the bottom left foreground, a silver EZ curl barbell with two black weight plates rests directly on the black floor. In the left midground, there is a white metal exercise machine with a blue upholstered seat, blue padded supports, and black weight plates loaded onto a side peg. A small red number 5 is printed on the white lower frame of this machine, and it has a step with a black grip surface. The large wall mirror behind this machine reflects the gym equipment and a distant window. Dominating the center and right midground is a tall white metal power rack. A straight silver barbell rests horizontally on the rack's black safety catches, with a small black nylon strap hanging from the bar. Directly behind this barbell, positioned against the back white wall, is a large, flat, circular white disc mounted on a black metal stand, resembling a large dial or wheel with small dark pins spaced around its outer edge. To the immediate right of the white power rack stands a tall black metal weight storage tree loaded with roughly fifteen black circular weight plates of varying sizes arranged vertically. Another vertical white metal upright column is positioned in front of this black weight tree. Partially visible on the far right edge is another black metal storage rack holding more black weight plates. Near the top right, attached to the black frame, is a small rectangular metallic plaque containing a star graphic and text that is partially unclear but appears to read ELITE.`;

const GPT52_DESC_GYM = `A square, close-to-medium indoor photograph shows a compact weight-training room, viewed from about chest height and angled slightly downward toward a white-and-black power rack in the center-right foreground. The room has white painted walls and a low white ceiling with exposed white pipes, elbows, and conduit running horizontally and diagonally across the top of the frame. The floor is covered with black rubber matting with a raised diamond tread pattern and visible seams between tiles. The lighting is bright and even, likely daylight, with soft shadows and clear highlights on metal surfaces. The color palette is mostly white, black, gray, and steel/silver, with small red accents.

The main object is a white power rack with black uprights and attachments occupying most of the center and right side. A barbell is racked across the middle at about chest height, extending left to right. The bar has a black foam pad around the center-right section and silver collars/clamps on both sides; a black hanging handle attachment and metal clip hang from the right side of the bar. The rack uprights have evenly spaced circular adjustment holes. A small red number "5" is printed on a white support near the lower middle-right. At the top-right crossbar, there is a small beige label with a star-like logo and partially legible text that appears to start with "ELI\u2026" (the rest is unclear).

Along the right side of the rack and partly cropped at the far right edge, multiple black round weight plates are stored on horizontal pegs attached to black vertical rails. Several stacks are visible at different heights, with plates of different diameters. Additional black plates are also visible near the bottom right and behind the rack frame. Across the whole image, including reflections, roughly 15\u201320 weight plates are visible.

In the lower left foreground, a curved barbell bar (EZ-curl style) lies on the floor diagonally, with one large black weight plate mounted on the visible end and a silver sleeve extending outward. Behind it, a white exercise machine or bench with black pads sits low in the frame, with a white metal base and a rectangular metal foot platform with a textured silver surface. A large black plate is leaned or mounted near the left side of this machine.

On the left wall, a large rectangular mirror fills much of the left half of the image. The mirror reflects more of the gym: another angle of a rack with more black plates, the same barbell and attachments, the exposed ceiling pipes, and a bright window with daylight coming through. Near the top of the reflection, red reversed numbers "22" are visible. A small wall switch or electrical plate is mounted on the far left wall next to the mirror.

Behind the main rack in the center background, there is a large white circular or oval board/disk mounted vertically on a black stand. It has a black rim and many small evenly spaced bolts or rivets around the edge, with a small piece of beige tape or paper attached near the lower portion. In the mirror, this same object appears as a thin side-on oval shape with small pegs or protrusions along its edge. The walls show minor scuffs, smudges, and small cracks, especially on the right wall near the floor. No people are visible.`;

const COPILOT_DESC_CHALK = `The image shows a large rectangular chalkboard mounted on a red wall. The viewpoint is straight on, at a medium distance, capturing the entire chalkboard and a small portion of the surrounding wall within a square frame. At the top left of the image, above the chalkboard, there is a digital clock displaying the red numbers "19:35." The clock sits on a light-colored wooden shelf supported by a black bracket. Part of a white electrical cable or object is visible on the left edge beneath the shelf. The red wall behind the chalkboard has visible seams and metal bolts.

The chalkboard surface is dark gray to black and filled with numerous handwritten white chalk notes. The handwriting is varied in size, density, and organization. There are multiple grouped sections, some separated by lines or spacing. The content appears to list names, numbers, times, and short notes. The writing covers almost the full width of the board and extends from the top edge to the lower half, leaving only the bottom several inches relatively empty except for a few chalk marks. The text is all written freehand and slightly smudged in some areas, giving a dusty chalk texture across the board.

Specific visible text elements include large headings such as "AMRAP," "Technique," "Wrm-Up," and various numbers like "18," "1/2/3," "19:35," and others. Many entries consist of a name followed by numbers, for example "Pierce: .5," "Michael: 1.3 + 28," "Logan 2|1522min," and many similar entries. There are also nested brackets around some groups of text on the right side. Some short abbreviations appear, such as "OHS," "CTB," and "T2B." Much of the text is organized in vertical lists, primarily in the center portion and the right half of the board. The upper left contains larger, more spaced-out writing describing what appears to be tasks or instructions, while the lower left contains a list of individual entries and numbers.

In the bottom right corner of the frame, sitting on the chalkboard ledge, there is a clear plastic cup with a small amount of liquid inside. Various chalk pieces or chalk dust residue are scattered along the entire bottom edge of the board.

Lighting appears to come from overhead indoor fixtures, creating a soft, even illumination with faint reflections on the chalkboard surface. The overall color palette includes black and white from the chalkboard and writing, red from the wall and the digital clock's digits, and small beige and wood tones from the shelf. The materials present include the dusty matte texture of the chalkboard, smooth painted metal or wood on the wall behind it, and the slightly glossy digital display surface of the clock.

The framing centers on the chalkboard, with the top of the image showing the clock and part of the red wall structure, and the lower edge showing the chalkboard tray and the plastic cup. No people are visible in the image.`;

const GPT52_DESC_CHALK = `The image shows a large rectangular chalkboard mounted on a red wall. The viewpoint is straight on, at a medium distance, capturing the entire chalkboard and a small portion of the surrounding wall within a square frame. At the top left of the image, above the chalkboard, there is a digital clock displaying the red numbers "19:35." The clock sits on a light-colored wooden shelf supported by a black bracket. Part of a white electrical cable or object is visible on the left edge beneath the shelf. The red wall behind the chalkboard has visible seams and metal bolts.

The chalkboard surface is dark gray to black and filled with numerous handwritten white chalk notes. The handwriting is varied in size, density, and organization. There are multiple grouped sections, some separated by lines or spacing. The content appears to list names, numbers, times, and short notes. The writing covers almost the full width of the board and extends from the top edge to the lower half, leaving only the bottom several inches relatively empty except for a few chalk marks. The text is all written freehand and slightly smudged in some areas, giving a dusty chalk texture across the board.

Specific visible text elements include large headings such as "AMRAP," "Technique," "Wrm-Up," and various numbers like "18," "1/2/3," "19:35," and others. Many entries consist of a name followed by numbers, for example "Pierce: .5," "Michael: 1.3 + 28," "Logan 2|1522min," and many similar entries. There are also nested brackets around some groups of text on the right side. Some short abbreviations appear, such as "OHS," "CTB," and "T2B." Much of the text is organized in vertical lists, primarily in the center portion and the right half of the board. The upper left contains larger, more spaced-out writing describing what appears to be tasks or instructions, while the lower left contains a list of individual entries and numbers.

In the bottom right corner of the frame, sitting on the chalkboard ledge, there is a clear plastic cup with a small amount of liquid inside. Various chalk pieces or chalk dust residue are scattered along the entire bottom edge of the board.

Lighting appears to come from overhead indoor fixtures, creating a soft, even illumination with faint reflections on the chalkboard surface. The overall color palette includes black and white from the chalkboard and writing, red from the wall and the digital clock's digits, and small beige and wood tones from the shelf. The materials present include the dusty matte texture of the chalkboard, smooth painted metal or wood on the wall behind it, and the slightly glossy digital display surface of the clock.

The framing centers on the chalkboard, with the top of the image showing the clock and part of the red wall structure, and the lower edge showing the chalkboard tray and the plastic cup. No people are visible in the image.`;

const GEMINI_PRO_DESC_CHALK = `The image presents a flat, front-facing, slight low-angle medium shot of a large, black rectangular chalkboard or dark grey whiteboard mounted against a brightly painted, smooth red wall. The scene is cropped to a 1:1 square aspect ratio. In the upper left corner, a small, light-colored wooden shelf is attached to the red wall with a black metal bracket. Resting on this shelf is a black rectangular digital clock displaying the time 19:35 in bright, glowing red LED numerals. Below the shelf, a partially obscured white piece of material or text is visible, showing the letters SEU.

The dominant element is the matte black board, enclosed by a thin black metal frame, which occupies the vast majority of the frame. A silver metal tray runs along the bottom edge of the board. Sitting on the far right side of this tray is a single translucent white plastic cup. The surface of the board is covered in dusty white chalk residue and densely packed with handwritten white text, lists, numbers, and drawn boxes, divided roughly into three vertical columns.

In the upper left section of the board, underlined text reads Jeudi 6 19 FORGE. Below this is a drawn rectangle containing the word WOD, followed by AMRAP 18. Underneath is a number line showing 8-10-12-14 with smaller numbers 1 through 7 written above the dashes, ending with 16, 18, 20. Below the number line is a list: a dot followed by O.H.S with 45 slash 45 written next to it, a dot followed by T2B, and a dot followed by Pistols. Further down on the left, the underlined word Technique appears above a dot followed by BAR MU slash CTB slash Pull up, and a dot followed by Pistol. In the lower left, a boxed time 18:30 has lines pointing down to a list of names and scores: Pierre colon 5, Mickael colon 3 plus 28 with a superscript 95, Romina colon 6 plus 20 with a superscript 55, Hafsa colon 5 plus 8 with a superscript 35 slash Knee To Elbow, Alessandro colon 5 superscript 95, and Maxime colon 5 plus 18 superscript 75 slash Knee 2 Elbow.

The center of the board features clusters of names and scores associated with boxed times. A box for 16:00 is near the top middle next to Lili 3 plus 29 and Ander 4 plus 10 Rx. Next to this is a boxed 17:30. Below a 17:00 box are the names Ming V. 3, Yann 4 plus 32, Liam 3 plus 34, and Mae 4 plus 8. To the right of these, curly brackets group pairs of names: Lorcan and Alexis are bracketed with 2152m Row, and Guillaume and Adam are bracketed with 2353m R. Below a second 16:00 box is Jamil 7 plus 44 Rx, Cristina 6 plus 11, Stephanie 4 plus 5, Bruno 5, and Tenu colon 6 plus 32 superscript 55. A bracket to their right groups Thomas and Patrick with 2773m A. In the lower middle, stacked boxes for 11:00 and 12:00 sit above a long list: Shayn colon 6 plus 20 Rx, Mat colon 4 plus 29 superscript 75, Fanny colon 4 plus 7, Franck colon 5 plus 5 Rx, Seb colon 4 plus 21 Rx, Ilona colon 4 plus 28, Stephane colon 5 plus 13 superscript 65, Karine colon 5 plus 10 superscript 65, Mathilde 5 plus 34, Axel colon 4 plus 26 superscript 85, and Thomas colon 6 plus 4 superscript 95. At the bottom right of the center column is Yannick colon 6 plus 54 Rx.

The rightmost column begins with a boxed HYROX next to T.C colon 4. Below is 2x 19 min ON slash 2 min. Underneath, a boxed number 1 precedes a list: A slash 400 m Run slash 300 m Ro, B slash 10 DB Thrusters, C slash 15 DB Split Squats, and D slash 20 Burpees. Below this is parenthetical text reading A plus B vertical bar A plus C vertical bar A plus D, followed by a line reading dash Rest 2 min dash. Below a boxed number 2 is the text You Go I Go, an asterisk next to 200m Ski Erg, Max m Run After, and an asterisk next to 30 sec Sprint. In the bottom right corner, text reads Warm-Up colon AMRAP 4 min above 20 JJ slash 10 Squat Ju, 10 Push-Ups slash 10 Co, and 10 Burpees followed by a drawn outline of a heart.

The lighting is even indoor artificial light, casting a distinct soft shadow under the wooden shelf onto the red wall and highlighting the stark, high-contrast palette of bright red, matte black, and stark white.`;

const COPILOT_DESC_G = `The image shows a painted mural on an outdoor wall, depicted in a mostly monochrome palette of blacks, whites, and grays. The scene occupies the full square frame. The wall surface appears slightly weathered, with visible brush textures. Snow sits along the top edge of the wall and at the bottom foreground, indicating a cold outdoor environment.

The mural consists of several illustrated figures arranged across the composition. In the lower half, a large wooden-plank surface rendered in light gray tones angles from the foreground toward the center, creating a sense of perspective. Several illustrated individuals sit or lean on or near this surface. One figure near the center is shown seated in profile, facing left, with dark clothing and a hat. Another figure sits or reclines toward the lower left portion of the image, also wearing dark clothing. Additional figures appear along the lower right area, positioned near the edge of the mural.

In the middle-right section, there is a painted sign composed of rectangular boards. The sign shows large, bold white letters spelling ART on the top board. Below that, smaller letters appear, partially legible as V I L L E R A Y.

In the upper half of the mural, several stylized portrait-style illustrations float against a dark background. One appears near the top center-left, showing a head and shoulders rendered in high-contrast white and gray. Another larger portrait appears to the right, showing a figure positioned behind what resembles a podium or desk-like shape. Additional partially visible figures appear at the left edge.

Lighting in the real-world scene is bright natural daylight, casting shadows on the snow and enhancing the contrast of the painted wall. The sky visible at the top is a bright, saturated blue. The overall color palette consists primarily of black, white, and gray mural artwork contrasted against the blue sky and white snow. Textures include the rough painted wall surface, the smooth appearance of the illustrated forms, and the soft, irregular texture of accumulated snow.`;

const CHATGPT_DESC_G = `A square, straight-on outdoor photograph shows a large painted mural on a dark wooden wall, filling almost the entire frame. The wall is made of large plywood or wood panels painted matte black, with visible panel seams running vertically and horizontally across the surface. The camera is positioned at about eye level and fairly close, so the mural fills the image edge to edge. A narrow band of deep blue sky is visible above the wall, and at the top right corner a tall brown tree trunk rises behind it. Bright white snow sits along the top edge of the wall, especially at the upper right where it hangs over in a thick, curved overhang casting a dark shadow on the wall. More snow forms a low strip along the bottom edge of the image in the foreground.

The mural is painted mostly in white, gray, and black tones, with a stencil-like, high-contrast look. The artwork includes approximately eight painted human figures or partial figures, all rendered in grayscale. On the left side, a large portrait of a person with wild, swept-back hair and a stern expression occupies the upper-left quadrant; only the left half and center of this figure are visible, and the body is cropped by the left edge. Beneath that, along the lower-left edge, there is another partial figure with curly hair and a dark jacket, also cropped heavily by the frame. Near the center top, there is a large tilted portrait of a smiling person with glasses, painted in pale gray and white, floating against the dark background. In the upper-right quadrant, there is a person in old-fashioned clothing with a pale, curled hairstyle, seated or positioned behind a white keyboard-like instrument or layered platform; a faint circular halo-like outline is painted around this figure's head.

Across the middle and lower half of the wall, the mural features a large geometric white-and-gray structure made of long diagonal planks or piano-key-like bands converging in perspective from left to right. Several figures are integrated into this structure. Near the center, a bearded person in profile faces right, seated or leaning, painted in darker gray with white highlights. Slightly left of center in the lower-middle area, a smaller figure wearing a dark cap looks upward; only the upper body is visible, emerging from or positioned within the white diagonal structure. In the lower-right corner, a smiling figure in a dark jacket is seated or crouched, turned slightly toward the camera, with one arm bent in front. At the right-middle edge, another figure leans forward with crossed or folded arms, painted in grayscale and partially overlapping the white structure.

Text is painted on the right-center portion of the mural in bold white block letters. The largest visible word reads "ART." Below it, smaller but still bold letters read "VILLERAY." Above the word "ART," there is a horizontal dark rectangular painted bar that obscures part of additional text or design behind it. The text sits on top of a white angular shape that resembles layered boards or a stylized sign.

Lighting is strong direct sunlight, producing crisp shadows and bright contrast. The top snow overhang creates a pronounced black shadow on the wall beneath it. The overall color palette is dominated by black, charcoal gray, white, and pale gray, with the only strong color accents being the vivid blue sky and the brown tree trunk. The painted wall surface appears slightly rough with visible wood grain and brush texture. At the extreme lower-left edge, a small pinkish curved shape is visible (unclear object), and a rounded dark shadow falls across the snow in the lower-left foreground.`;

const GEMINI_DESC_G = `A straight-on, medium-distance photograph of a large outdoor mural painted on a textured black wooden surface, with visible vertical seams characteristic of plywood panels. The mural features a collage of seven grayscale portraits of men painted in high-contrast black, white, and gray, arranged around abstract geometric shapes. Above the mural is a strip of clear, bright blue sky. Clumps of white snow are piled irregularly along the top edge of the wooden board and along the ground at the very bottom edge. In the middle-right area of the mural is a painted logo featuring a black, slightly angled rectangular box containing the word ART in large, bold, white capital letters. Just below and slightly to the right of this box is the word VILLERAY in smaller white capital letters. Spanning the lower half and middle of the composition are large, angled white and light gray planes painted with dark, parallel lines, resembling stylized piano keyboards, soundwaves, or architectural surfaces. The painted figures are positioned around and behind these lined structures. In the top left corner is a portrait of Ludwig van Beethoven with wild wavy hair and a cravat, looking forward with a stern expression. In the top center is a portrait of a broadly smiling Louis Armstrong. In the top right is a portrait of Johann Sebastian Bach wearing a curled wig, positioned above a small section of the lined surface. On the far left edge is a partial profile of a man with dark curly hair and a mustache. Below Beethoven is a younger-looking man leaning slightly back with his eyes closed and face turned upward. In the center, below Armstrong, is a sharp profile portrait of a bearded man in a suit facing left. On the right side, just below the text block, a balding man in a dark suit leans forward, looking directly at the viewer. In the bottom right corner, a smiling man with short dark hair wearing a dark suit is positioned behind the lowest lined surface. The scene is lit by bright, natural daylight, which illuminates the snow and casts a distinct, dark shadow across the bottom left corner of the mural. The painted artwork itself utilizes dramatic chiaroscuro lighting. The composition is framed as a square, tightly encompassing the painted figures, text, and geometric elements.`;


// ──────────────────────────────────────────────────────────
// Observations: per-image insights shown in the lightbox
// Keyed by generated image path
// ──────────────────────────────────────────────────────────
export const IMAGE_OBSERVATIONS = {
  // ── Demo 1: Same prompt (GPT-5.2 description), different generators ──

  // Concordia building
  'images/demo-1/demo-1-a-chatgpt.png': [
    'Captures the major architectural elements and both sets of "CONCORDIA" text, but the output feels like a slightly stiff 3D render. The requested traffic light is just a dark pole.',
    'The Perfectionist tries to include everything, but the result feels constructed rather than captured.',
  ],
  'images/demo-1/demo-1-a-copilot.png': [
    'The prompt explicitly described a messy intersection with a traffic light and signs. Copilot erased them entirely to present a clean, unobstructed corner with a deep blue sky.',
    'The Editor strikes again. It prioritized a pristine marketing aesthetic over the prompt\'s messy reality.',
  ],
  'images/demo-1/demo-1-a-gemini.png': [
    'Incredibly photorealistic. It perfectly integrated the prompt\'s "clutter" — nailing the traffic light, the "BUS TAXI" sign, and the autumn foliage on the right.',
    'The Storyteller surprisingly delivers the most faithful street-level documentary shot, balancing exact details with natural atmosphere.',
  ],

  // Street festival
  'images/demo-1/demo-1-b-chatgpt.png': [
    'Church spires, string lights, "Drolet" street sign, "ARRÊT" sign, blue-and-white tent canopy. It literally read the signs.',
    'Forensic reconstruction of the chaos. The wet pavement shimmer is perfectly captured.',
  ],
  'images/demo-1/demo-1-b-copilot.png': [
    'The prompt asked for chaos; Copilot delivered a tourism brochure. It organized the crowd, cleaned the tents, and brightened the sky.',
    'Same scene, but it feels like a tourism brochure. The chaos is choreographed.',
  ],
  'images/demo-1/demo-1-b-gemini.png': [
    'Far fewer people, wet pavement, someone carrying an umbrella. Added rain that isn\'t in the original. The brick and green awnings are nicely detailed.',
    'The Storyteller didn\'t document the festival; it directed a scene.',
  ],

  // Chalkboard
  'images/demo-1/demo-1-c-chatgpt.png': [
    'Actual chalk handwriting — "Jeudi", "WOD", "AMRAP 18". It reproduced the chaotic layout, brackets, and even the chalk dust smears.',
    'The Perfectionist\'s knockout.',
  ],
  'images/demo-1/demo-1-c-copilot.png': [
    'The chaos is organized into neat columns with clear spacing. The red wall, 19:35 clock, and plastic cup are all there, but the board itself reads like a formatted spreadsheet.',
    'A messy gym workout turned into a corporate training schedule. The Editor\'s thesis in one image.',
  ],
  'images/demo-1/demo-1-c-gemini.png': [
    'Every section is there — WOD, Technique, HYROX. The handwriting is cleaner, the structure more readable, and the chipped paint on the red wall is incredibly realistic.',
    'The most complete of the three. Splits the difference between chaos and order.',
  ],

  // Tabletop / mirror
  'images/demo-1/demo-1-e-chatgpt.png': [
    'Lavender vase, smart display at "7:49", checkerboard tray, sunglasses, poinsettia, timer, "LASER GAME" box — all present. Mirror reflection roughly correct.',
    'Your actual messy desk. The Perfectionist doesn\'t editorialize — it reconstructs.',
  ],
  'images/demo-1/demo-1-e-copilot.png': [
    'Every object is present, but perfectly spaced with breathing room. The notebook and sunglasses are centered on the tray. It even added a small red apple.',
    'The lived-in surface became a real estate listing. The Editor turned your desk into a product shoot.',
  ],
  'images/demo-1/demo-1-e-gemini.png': [
    'Warmest light of the three — golden, soft, and natural. The objects are in roughly the right places, and the mirror reflection feels the most realistic.',
    'Your desk in a lifestyle blog. Not a forensic inventory, not a sterile arrangement — just a perfect vibe.',
  ],

  // ── Demo 2: Different describers, same generator (ChatGPT) ──

  // Palm trees (child drawing)
  'images/demo-2/demo-2-a-chatgpt.png': [
    'GPT-5.2 described everything — crisscross trunks, pink-to-purple sky gradients, paper edges. The result looks like a thick oil-pastel painting. Soft, textured, faithful to the original\'s hand-made feel.',
    'Same generator, but this description produced art that looks handmade.',
  ],
  'images/demo-2/demo-2-a-copilot.png': [
    'Copilot said "two palm trees, crisscross pattern, yellow sun" — 196 words, then stopped. The generator filled the gaps with clip-art defaults, inventing a sandy beach and grass.',
    'The Editor\'s brevity became the image\'s personality.',
  ],
  'images/demo-2/demo-2-a-gemini.png': [
    'Gemini described "energetic, broadly angled marker strokes" — qualitative, not just spatial. The result sits between the other two: colored-pencil texture with vivid energy.',
    'The description\'s tone entirely shaped the output.',
  ],

  // Basement table
  'images/demo-2/demo-2-b-chatgpt.png': [
    'Every label readable: "DÉCOUVRE LA LUMIÈRE", "MECCANO", "LEGO TECHNIC", "Pokémon", "UNO MOO!" GPT-5.2 used 1,100 words to describe this scene. You can read the boxes.',
    'When the description reads every label, the generator reproduces every label. Input obsession → output fidelity.',
  ],
  'images/demo-2/demo-2-b-copilot.png': [
    'Copilot organized the chaos into spatial zones — and the output reflects it. More boxes, more neatly stacked, generic titles. The yellow tray and blue block are there but the labels are vague.',
    'The description was already tidied up. The sanitization happens at the description, not the generation.',
  ],
  'images/demo-2/demo-2-b-gemini.png': [
    'Darker, moodier lighting — the concrete wall and wood grain feel grittier. The "translucent golden plastic dragon toy" is visible. The blue cable on the wall and the backpack on the chair are there.',
    'Gemini opened with atmosphere: "unfinished room, likely a basement, with rough grey concrete walls." The generator set the mood before placing objects.',
  ],

  // Mural (street art)
  'images/demo-2/demo-2-c-chatgpt.png': [
    'GPT-5.2 described ~8 figures by position and pose but didn\'t name them. The output has figures, piano-key structures, "ART VILLERAY" — but no one is recognizable.',
    'Without names in the description, the generator drew generic people. Literalism without recognition.',
  ],
  'images/demo-2/demo-2-c-copilot.png': [
    'Copilot called them "illustrated individuals" in generic poses. The result is unrecognizable — dark, atmospheric, people sitting on benches. The original\'s musicians are gone entirely.',
    'The most dramatic drift in the entire demo. Abstract description → abstract output. The original mural was erased.',
  ],
  'images/demo-2/demo-2-c-gemini.png': [
    'Gemini named "Beethoven," "Louis Armstrong," "Bach" — and the generator delivered. You can identify each musician. The composition is the closest to the original of all three.',
    'The only one that looks like the actual mural. Recognition in the description became recognition in the image.',
  ],

  // Chalkboard (demo 2 — same generator, different describers)
  'images/demo-2/demo-2-d-chatgpt.png': [
    'Fewer entries than the original — "Pierce", "Michael", "Logan" with scores, "AMRAP", "OHS/CTB/T2B." Simplified but the handwriting looks natural and chalky.',
    'Same generator as the other two, but GPT-5.2\'s raw transcription produced handwritten-looking output. The description IS the perspective.',
  ],
  'images/demo-2/demo-2-d-copilot.png': [
    'Clean two-column layout, proper names with tidy scores. "AMRAP", "Technique", "Wrm-Up" as headings. The text is readable but feels like a printed worksheet.',
    'Copilot described the pattern — "names followed by numbers" — not the actual content. Structure in, structure out.',
  ],
  'images/demo-2/demo-2-d-gemini.png': [
    'Packed with detail — "Jeudi 6/19 FORGE", time boxes, HYROX workout breakdown, even a heart drawn at the bottom right. Nearly every entry from the original board is represented.',
    'Gemini transcribed the entire board column by column. The most thorough describer produced the most thorough output — with the same generator.',
  ],
};

const PH = null;

function makeGenerators(img1, img2, img3) {
  return [
    { generationTool: 'gpt-image', generationToolName: 'ChatGPT (GPT Image)', generatedImagePath: img1, isControl: true },
    { generationTool: 'copilot-designer', generationToolName: 'Copilot Designer', generatedImagePath: img2 },
    { generationTool: 'nano-banana', generationToolName: 'Nano Banana Pro', generatedImagePath: img3 },
  ];
}

export const DEMO_IMAGE_CHAINS = {
  sampleId: 'sample-1',

  // Section 1: Same Description, Different Generators
  // GPT-5.2 Thinking provides the most thorough description per image
  samePrompt: {
    descriptionModel: 'chatgpt',
    descriptionModelName: 'GPT-5.2 Thinking',
    descriptions: {
      'sample-1': GPT52_DESC_SAMPLE1,
      'sample-2': GPT52_DESC_SAMPLE2,
      'sample-3': GPT52_DESC_SAMPLE3,
      'sample-5': GPT52_DESC_SAMPLE5,
    },
    rows: [
      { sampleId: 'sample-1',  generators: makeGenerators('images/demo-1/demo-1-a-chatgpt.png', 'images/demo-1/demo-1-a-copilot.png', 'images/demo-1/demo-1-a-gemini.png') },
      { sampleId: 'sample-2',  generators: makeGenerators('images/demo-1/demo-1-b-chatgpt.png', 'images/demo-1/demo-1-b-copilot.png', 'images/demo-1/demo-1-b-gemini.png') },
      { sampleId: 'sample-3',  generators: makeGenerators('images/demo-1/demo-1-c-chatgpt.png', 'images/demo-1/demo-1-c-copilot.png', 'images/demo-1/demo-1-c-gemini.png') },
      { sampleId: 'sample-5',  generators: makeGenerators('images/demo-1/demo-1-e-chatgpt.png', 'images/demo-1/demo-1-e-copilot.png', 'images/demo-1/demo-1-e-gemini.png') },
    ],
  },

  // Section 2: Different Descriptions, Same Generator
  // 3 models describe each image; ChatGPT (GPT Image) generates all
  sameGenerator: {
    generationTool: 'gpt-image',
    generationToolName: 'ChatGPT (GPT Image)',
    rows: [
      {
        originalImagePath: 'images/demo-2/demo-2-a.jpg',
        descriptions: [
          { descriptionModel: 'chatgpt',    descriptionModelName: 'GPT-5.2 Thinking', description: GPT52_DESC_PALMS,      generatedImagePath: 'images/demo-2/demo-2-a-chatgpt.png', isControl: true },
          { descriptionModel: 'copilot',    descriptionModelName: 'MS Copilot',       description: COPILOT_DESC_PALMS,    generatedImagePath: 'images/demo-2/demo-2-a-copilot.png' },
          { descriptionModel: 'gemini-pro', descriptionModelName: 'Gemini 3.1 Pro',   description: GEMINI_PRO_DESC_PALMS, generatedImagePath: 'images/demo-2/demo-2-a-gemini.png' },
        ],
      },
      {
        originalImagePath: 'images/demo-2/demo-2-b.jpg',
        descriptions: [
          { descriptionModel: 'chatgpt',    descriptionModelName: 'GPT-5.2 Thinking', description: GPT52_DESC_TAB2,      generatedImagePath: 'images/demo-2/demo-2-b-chatgpt.png', isControl: true },
          { descriptionModel: 'copilot',    descriptionModelName: 'MS Copilot',       description: COPILOT_DESC_TAB2,    generatedImagePath: 'images/demo-2/demo-2-b-copilot.png' },
          { descriptionModel: 'gemini-pro', descriptionModelName: 'Gemini 3.1 Pro',   description: GEMINI_PRO_DESC_TAB2, generatedImagePath: 'images/demo-2/demo-2-b-gemini.png' },
        ],
      },
      {
        originalImagePath: 'images/demo-2/demo-2-c.jpg',
        descriptions: [
          { descriptionModel: 'chatgpt',    descriptionModelName: 'GPT-5.2 Thinking', description: CHATGPT_DESC_G,    generatedImagePath: 'images/demo-2/demo-2-c-chatgpt.png', isControl: true },
          { descriptionModel: 'copilot',    descriptionModelName: 'MS Copilot',       description: COPILOT_DESC_G,    generatedImagePath: 'images/demo-2/demo-2-c-copilot.png' },
          { descriptionModel: 'gemini-pro', descriptionModelName: 'Gemini 3.1 Pro',   description: GEMINI_DESC_G,     generatedImagePath: 'images/demo-2/demo-2-c-gemini.png' },
        ],
      },
      {
        originalImagePath: 'images/demo-2/demo-2-d.jpg',
        descriptions: [
          { descriptionModel: 'chatgpt',    descriptionModelName: 'GPT-5.2 Thinking', description: GPT52_DESC_CHALK,      generatedImagePath: 'images/demo-2/demo-2-d-chatgpt.png', isControl: true },
          { descriptionModel: 'copilot',    descriptionModelName: 'MS Copilot',       description: COPILOT_DESC_CHALK,    generatedImagePath: 'images/demo-2/demo-2-d-copilot.png' },
          { descriptionModel: 'gemini-pro', descriptionModelName: 'Gemini 3.1 Pro',   description: GEMINI_PRO_DESC_CHALK, generatedImagePath: 'images/demo-2/demo-2-d-gemini.png' },
        ],
      },
    ],
  },
};
