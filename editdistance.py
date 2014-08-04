def edit_distance(str1, str2):

    # set up the intial matrix
    matrix = [[0 for _ in range(len(str2) + 1)] for _ in range(len(str1) + 1)]

    for i in range(len(str1) + 1):
        matrix[i][0] = i

    for i in range(len(str2) + 1):
        matrix[0][i] = i

    # dynamically compute the edit distance
    for i in range(1, len(str1) + 1):
        for j in range(1, len(str2) + 1):
            matrix[i][j] = min(
                    matrix[i-1][j-1] + (0 if str1[i - 1] == str2[j - 1] else 1),
                    matrix[i-1][j] + 1,
                    matrix[i][j-1] + 1)

    return matrix[len(str1)][len(str2)];
