# 🔍 Identifying Information Found

## 📊 Search Results

### **Files Containing Identifiers:**
- ✅ `src/components/about/About.jsx` - **MAIN FILE** (visible on website)
- ⚠️ `docs/archive/UI_FIXES_PLAN.md` - Documentation only
- ⚠️ `docs/ForwardPlaybook.md` - Documentation only

### **Projects:**
- ✅ No identifying information found in project files

---

## 🎯 What Was Found in About.jsx

### **Institutions:**
1. **"University of Queensland"** (appears 1 time)
   - Line 39: Card title
   - Line 44: "UQ raised the bar..." (in description)
   - Line 86: "During my last semester at UQ..."

2. **"University of Technology Sydney"** (appears 1 time)
   - Line 60: Card title
   - Line 65: "I completed a Master's in Genetic Counseling at UTS..."

3. **"UQ"** (appears ~6 times)
   - Throughout descriptions and comments

4. **"UTS"** (appears ~15 times)
   - Throughout descriptions, variable names, and comments

5. **"IGM Team"** (appears multiple times)
   - Line 81: Card title
   - Line 86: "Integrating Genomics into Medicine (IGM)"
   - Multiple variable names: `show2022Cards`, comments mention "IGM"

### **Personal Names:**
6. **"Aideen McInerney"** (appears 1 time)
   - Line 86: "a guest lecture by Aideen McInerney..."

---

## 🎨 Obfuscation Strategies

### **Option 1: Simple Misspelling (Quick & Easy)** ⭐ RECOMMENDED

Add random character to break search/crawlers:

```
IGM → IG_M or IGnM or I-GM
UQ → UnQ or U_Q or UQn
UTS → UTnS or U_TS or UT-S
University of Queensland → Uni_versity of Queen_sland
Aideen McInerney → Aide_en McIn_erney
```

**Pros:**
- ✅ Still readable by humans
- ✅ Breaks automated searches
- ✅ Quick to implement
- ✅ Easy to reverse later

**Cons:**
- ⚠️ Looks a bit weird
- ⚠️ Manual search could still find it

---

### **Option 2: Generic Replacements (Most Professional)**

Replace with generic terms:

```
University of Queensland → Research University (Brisbane)
University of Technology Sydney → Technical University (Sydney)
IGM Team → Genomics Research Group
Aideen McInerney → [Mentor Name]
```

**Pros:**
- ✅ Looks completely natural
- ✅ No weird formatting
- ✅ Tells the story without specifics

**Cons:**
- ⚠️ Loses some authenticity
- ⚠️ Changes the narrative

---

### **Option 3: CSS Obfuscation (Technical)**

Use CSS/HTML tricks to hide from crawlers:

```jsx
// Display "IGM" but in HTML it's different
<span className="obfuscated">I<span style={{display:'none'}}>x</span>GM</span>

// Renders as "IGM" but HTML shows "IxGM"
```

**Pros:**
- ✅ Looks 100% normal to humans
- ✅ Confuses bots/crawlers

**Cons:**
- ⚠️ More complex
- ⚠️ Can be discovered by inspecting HTML

---

### **Option 4: ROT13 / Caesar Cipher (Reversible)**

Shift letters by N positions:

```
IGM → VTZ (shifted by 13)
UQ → HD (shifted by 13)
UTS → HGF (shifted by 13)
```

**Pros:**
- ✅ Completely unrecognizable
- ✅ Reversible

**Cons:**
- ❌ Unreadable by humans
- ❌ Looks like gibberish

---

## 💡 My Recommendation

**Use Option 1 (Simple Misspelling)**

It's the best balance:
- Quick to implement
- Still readable
- Breaks automated searches
- Easy to reverse when you're ready to go public

### **Proposed Changes:**

```diff
- University of Queensland
+ Univ_ersity of Que_ensland

- University of Technology Sydney
+ Univ_ersity of Technol_ogy Syd_ney

- UQ
+ U_Q

- UTS
+ U_TS

- IGM Team
+ I_GM Team

- Integrating Genomics into Medicine (IGM)
+ Integr_ating Genom_ics into Medi_cine (I_GM)

- Aideen McInerney
+ Aid_een McI_nerney
```

This breaks search indexing while keeping it readable!

---

## 📝 Implementation Plan

1. **Create obfuscation function:**
   ```jsx
   const obfuscate = (text) => text.replace(/([aeiou])/gi, '$1_');
   ```

2. **OR** manually replace in About.jsx

3. **Docs files:** Leave as-is (not public-facing)

---

## 🔄 Easy Reversal

When ready to go public:

```bash
# Find and replace
_ → (nothing)

# Done! All names restored
```

---

What would you like to do?
- **A)** Use Option 1 (simple misspelling with underscores)
- **B)** Use Option 2 (generic replacements)
- **C)** Use Option 3 (CSS tricks)
- **D)** Custom approach (tell me what you want)
