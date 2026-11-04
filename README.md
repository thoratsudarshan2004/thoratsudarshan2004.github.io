# Sudarshan Portfolio

Reference video wale portfolio ka same design — plain **HTML + CSS + JavaScript**.
Koi install, koi build step nahi. `index.html` double-click karo, site chal jayegi.

## Kya-kya use hua hai (reference se match kiya gaya)

Reference site Next.js + React pe bani hai, par wo sirf dhancha hai — jo **dikhta**
hai wo ye libraries banati hai, aur wahi yahan bhi lagi hai (CDN se, install nahi
karna padta):

| Cheez | Kahan | Kya karti hai |
|---|---|---|
| **Lenis** | poori site | smooth / inertia wala scroll |
| **GSAP + ScrollTrigger** | poori site | scroll pe chalne wale animations |
| **TextPressure** | hero ka naam | cursor paas aate hi letters **mote aur chaude** ho jaate hai (Roboto Flex ke `wdth` 25→151 aur `wght` 100→1000 axes) |
| **clip-path** | philosophy | image chhoti se poori screen pe khulti hai |

Fonts bhi exactly wahi hai jo reference me the:

| Font | Kahan |
|---|---|
| **Roboto Flex** | hero ka bada naam (variable font) |
| **Inter** | SELECTED PROJECTS heading, card descriptions, buttons |
| **Josefin Sans** | THE PHILOSOPHY, statement, card titles, tags, projects subtitle |
| **Poppins** | hero description, Experience, Contact, Send button |
| **Space Grotesk** | logo, chhote labels, hints |

---

## Chalane ke liye

**Sabse aasan:** `index.html` pe double-click.

**Ya local server (recommended, taaki sab kuch exactly waise chale):**

```bash
python -m http.server 5173
```

Phir browser me kholo: `http://localhost:5173`

---

## File structure

```
sudarshan portfolio/
  index.html          <- saara content (text, sections) yahi hai
  css/style.css       <- colors, fonts, layout
  js/main.js          <- preloader, menu, cursor, scroll animations
  assets/
    philosophy.svg          <- philosophy ke do laal haath (abhi ye laga hai)
    philosophy-fresco.jpg   <- Michelangelo wala option
    favicon.svg             <- browser tab ka icon
```

---

## Social links — sirf EK jagah

Saare social links `js/main.js` ke sabse upar `LINKS` me hai. Ek baar badlo,
poori site (menu + contact + project cards) me apne aap lag jata hai:

```js
var LINKS = {
  github:    "https://github.com/thoratsudarshan2004",
  instagram: "https://www.instagram.com/sudarshan_4679/",
  linkedin:  "",     // <- khaali hai
  twitter:   ""      // <- khaali hai
};
```

Khaali (`""`) chhoda to wo icon **faded** ho jata hai aur click nahi hota —
dead link nahi banta. Link daalte hi apne aap chalu ho jayega.

---

## ⚠️ Abhi kya baaki hai

| Cheez | Status |
|---|---|
| GitHub | ✅ `thoratsudarshan2004` (git config se liya — confirm kar lena) |
| Instagram | ✅ `sudarshan_4679` |
| Email | ✅ `thoratsudarshan2004@gmail.com` |
| Phone | ✅ `+91 93569 19179` |
| LinkedIn | ❌ khaali |
| Twitter / X | ❌ khaali |
| Location | ⚠️ `Maharashtra, India` — mera guess hai |
| Experience ke saal | ⚠️ approximate — `timeline__year` me badal lena |
| Education | ❌ section hai hi nahi |

Project cards ke GitHub links abhi tumhari **profile** pe jaate hai, repo pe nahi
— repo public karoge to `LINKS` ke bajaye us card me seedha repo URL daal dena.

> **Phone number ke baare me:** public site pe number hone se spam calls/WhatsApp
> aa sakte hai. Hatana ho to `index.html` me `Phone` wala `<div class="detail">`
> block delete kar do.

---

## Apni details kaise bharein

Sab kuch `index.html` me hai. Ye cheezein badalni hai:

| Kya badalna hai | Kahan |
|---|---|
| Hero me bada naam | `<div class="hero__name">` — har letter ka apna `<span>` hai |
| Tagline / description | `hero__tagline`, `hero__desc` |
| Projects (5 hai) | `<article class="card">` blocks |
| Experience timeline | `<div class="timeline__row">` blocks |
| Email / phone / location | `contact` section ke `detail__value` |
| Social links | `js/main.js` ka `LINKS` (upar dekho) |
| Logo `ST.` | `nav__logo` |

> **Hero naam badalte waqt dhyan:** har letter alag `<span>` me hona chahiye, warna
> letters spread nahi honge. Jaise: `<span>R</span><span>A</span><span>M</span>`

### Colors badalne hai?

`css/style.css` ke sabse upar `:root` me saare colors hai:

```css
--ember: #a02a22;        /* main laal */
--orange: #fc6b2f;       /* glow */
--void: #050505;         /* background */
```

Ek jagah badlo, poori site badal jayegi.

---

## Images

Philosophy section ke liye `assets/` me **chaar option** padhe hai:

| File | Kya hai |
|---|---|
| `philosophy-red.jpg` | **abhi ye laga hai** — tumhari di hui photo, reference jaisi laal grade karke |
| `philosophy.jpg` | wahi photo, bina edit ke (natural sepia/brown) |
| `philosophy.svg` | maine draw kiya tha — laal haath, vector, sirf 3.5 KB |
| `philosophy-fresco.jpg` | Michelangelo ki asli *Creation of Adam*, Wikimedia Commons, public domain |

Badalne ke liye `css/style.css` me `.scroll-expand__media` dhundho, bas ek line:

```css
background: url("../assets/philosophy-red.jpg") center / cover no-repeat;
/*                            ^^^ yahan naam badal do */
```

> Photo 1200×630 ki hai. Bade 2K/4K monitor pe thodi soft lag sakti hai — agar
> kahin se badi (1920px+) mil jaye to usse replace kar dena, sharper dikhegi.

Project cards ke andar jo "browser mockups" dikhte hai wo **CSS se bane hue** hai
(koi real screenshot nahi). Apne project ka screenshot lagana ho to us card me
`<div class="mock">...</div>` ki jagah `<img src="assets/mera-project.png">` daal do.

Project cards ke andar jo "browser mockups" dikh rahe hai wo bhi **CSS se bane hue**
hai (koi real screenshot nahi). Apne projects ke real screenshots lagane ho to
`card__visual` ke andar `<div class="mock">` ki jagah `<img src="assets/mera-project.png">`
daal do.

---

## Online kaise daalein (free)

**GitHub Pages:**
1. GitHub pe naya repo banao
2. Ye saari files upload karo
3. Settings → Pages → Branch: `main` → Save
4. 2 minute me link mil jayega

**Netlify / Vercel:** folder ko drag-and-drop kar do, bas.

---

## Contact form

Abhi form ka koi backend nahi hai — submit karne pe visitor ka **mail app khulta hai**
pre-filled message ke saath. Asli form chahiye (message seedha inbox me aaye) to
[Formspree](https://formspree.io) ya [Web3Forms](https://web3forms.com) free me lag
jaate hai — `js/main.js` ke `form()` function me endpoint badalna hoga.

---

## Note

Ye design [jishnumondal.vercel.app](https://jishnumondal.vercel.app) se inspired hai
(reference video wali site). Layout, colors aur motion match kiye gaye hai, par code
poora naya likha gaya hai aur saari images apni hai.
