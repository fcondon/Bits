phoneme_placeholder = "0"
phoneme_type_0 = "0"
phoneme_type_1 = "1"
phoneme_type_2 = "2"
phoneme_type_3 = "3"
phoneme_type_4 = "4"
phoneme_type_5 = "5"
phoneme_type_6 = "6"

phoneme_maps = str.maketrans({
        "a" : phoneme_type_0,
        "e" : phoneme_type_0,
        "i" : phoneme_type_0,
        "o" : phoneme_type_0,
        "u" : phoneme_type_0,
        "h" : phoneme_type_0,
        "w" : phoneme_type_0,
        "y" : phoneme_type_0,
        "b" : phoneme_type_1,
        "f" : phoneme_type_1,
        "p" : phoneme_type_1,
        "v" : phoneme_type_1,
        "c" : phoneme_type_2,
        "g" : phoneme_type_2,
        "y" : phoneme_type_2,
        "k" : phoneme_type_2,
        "q" : phoneme_type_2,
        "s" : phoneme_type_2,
        "x" : phoneme_type_2,
        "z" : phoneme_type_2,
        "d" : phoneme_type_3,
        "t" : phoneme_type_3,
        "l" : phoneme_type_4,
        "m" : phoneme_type_5,
        "n" : phoneme_type_5,
        "r" : phoneme_type_6,
})

def soundex(input_str):
    input_str = input_str.casefold()
    working_str = input_str[0]

    # stem phonemes to canonical digit representation
    working_str += input_str[1:].translate(phoneme_maps)

    # remove dupes
    working_str = remove_consecutive_dupes(working_str)

    # remove zeros
    working_str = remove_char(working_str, "0")

    # pad with zeroes to 4 characters
    while len(working_str) < 4:
        working_str += phoneme_placeholder

    return working_str[:4]

def remove_char(input_str, to_remove):
    if len(input_str) == 0:
        return ""
    elif input_str[0] == to_remove:
        return remove_char(input_str[1:], to_remove)
    else:
        return input_str[0] + remove_char(input_str[1:], to_remove)

def remove_consecutive_dupes(input_str):
    working_str = input_str

    last_char = None
    working_ind = 0

    for char in input_str:
        if char == last_char:
            working_str = working_str[0:working_ind] + working_str[working_ind + 1:]
        else:
            working_ind += 1
            last_char = char

    return working_str

def remove_consecutive_dupes_recursive(input_str, last_char):
    if len(input_str) == 0:
        return "" 
    elif input_str[0] == last_char:
        return remove_consecutive_dupes_recursive(input_str[1:], last_char)
    else:
        return input_str[0] + remove_consecutive_dupes_recursive(input_str[1:], input_str[0])
