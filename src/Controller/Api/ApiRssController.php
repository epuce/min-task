<?php

namespace App\Controller\Api;

use App\Controller\ApiResponse;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Stopwatch\Stopwatch;

class ApiRssController extends AbstractController
{
    static $top50 = [];
    static $words = [];
    static $count = 0;

    static function CountWords($string) {
        $split = preg_split("/[^\w]*([\s]+[^\w]*|$)/", $string, -1, PREG_SPLIT_NO_EMPTY);

        foreach ($split as $word) {
            if (isset(self::$words[$word])) {

                self::$words[$word] = self::$words[$word] + 1;
            } else {
                self::$words[$word] = 1;
            }
        }
    }

    static function checkElement($element) {
        if (gettype($element) === 'array') {
            foreach ($element as $key=>$child) {
                self::checkElement($child);
            }
        } else {
            self::CountWords($element);
        }
    }

    public function getFeed(): ApiResponse
    {
        $stopWatch = (new Stopwatch())->start(__METHOD__);

        $content = file_get_contents('https://www.theregister.co.uk/software/headlines.atom');
        $xml = new \SimpleXMLElement($content);

        $data = json_decode((json_encode($xml)), TRUE);

        foreach ($data as $key=>$element) {
            self::checkElement($element);
        }

        arsort(self::$words);

        return ApiResponse::content(
            ['status' => array_slice(self::$words, 0, 9)],
            200,
            $stopWatch->stop()->getDuration()
        );
    }
}