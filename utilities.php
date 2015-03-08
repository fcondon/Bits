<?

// Euclidean distance measure
// Assumes point1 and point2 are arrays of equal size
// i.e. points with the same dimensionality
function l2_distance($point1, $point2) {
    $working_val = 0;
    for ($i = 0; $i < count($point1); $i++) {
        $working_val += pow(($point1[$i] - $point2[$i]), 2);
    }
    return pow($working_val, (1/2));
}


// Gets the centroid for a set of points
function get_centroid($points) {
    $dimension_sums = [];

    foreach($points as $point) {
        foreach($point as $dimension => $val) {
            if (isset($dimension_vals[$dimension])) {
                $dimension_sums[$dimension] += $val;
            } else {
                $dimension_sums[$dimension] = $val;
            }
        }
    }

    $centroid = [];
    foreach($dimension_sums as $sum_val) {
        $centroid[] = $sum_val / count($points);
    }

    return $centroid;
}

// Naively takes a set of points and a set of named centroids and returns a mapping
// from cluster name to assigned points
// Optional param distance measure function
function get_point_assignments($points, $clusters, $distance_measure='l2_distance') {
    $cluster_points = [];

    foreach ($points as $candidate_point) {
        $distances = [];
        foreach ($clusters as $cluster_name => $centroid) {
            $distances[$cluster_name] = $distance_measure($candidate_point, $centroid);
        }
        $min_dist = min($distances);
        $cluster_name = array_search($min_dist, $distances);

        if (isset($cluster_points[$cluster_name])) {
            $cluster_points[$cluster_name][] = $candidate_point; 
        } else {
            $cluster_points[$cluster_name] = [$candidate_point];
        }
    }
    return $cluster_points;
}
